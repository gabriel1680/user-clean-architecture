import Email from "@domain/model/user/Email";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import ForgotTokenRepository from "@application/usecases/user/ForgotPassword/interfaces/ForgotTokenRepository";
import TokenManager from "@application/services/TokenManager";
import MailService from "@application/services/MailService";
import { forgotTemplateFactory } from "@infra/mail/factories";
import { app } from "@main/config/configs";
import { ApplicationError } from "@application/errors";
import { capitalizeName } from "../shared/helpers/capitalizeName";
import { IForgotPassword } from "@application/usecases/user/ForgotPassword/interfaces";
import User from "@domain/model/user/User";

export default class ForgotPassword implements IForgotPassword {
    constructor(
        private readonly repository: ForgotTokenRepository,
        private readonly tokenManager: TokenManager,
        private mailer: MailService
    ) {}

    public async execute(email: string): Promise<ApplicationError | void> {
        const user = await this.repository.findByEmail(email);
        if (!user) return new UserNotFound();

        const forgotToken = this.makeToken(user);
        user.requestChangePassword(forgotToken);

        await this.repository.doUpdate(user);

        // send mail
        const messageHTMLBody = await forgotTemplateFactory({
            confirm_link: `${app.frontend_url}/change-password/${email}/${user.forgotToken}`,
            first_name: capitalizeName(user.name.firstName),
        });

        this.mailer
            .send([new Email(email)], {
                subject: "Recuperação de senha",
                body: messageHTMLBody,
            })
            .catch((e) =>
                console.error("[Error on sending forgot token mail] => ", e)
            );
    }

    private makeToken(user: User) {
        const now = new Date();
        return this.tokenManager.generateToken(
            {
                id: user.id,
            },
            now.setTime(now.getTime() + 60 * 60) // 1 hour
        );
    }
}
