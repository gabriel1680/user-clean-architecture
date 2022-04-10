import { Email } from "@domain/entities/user/valueobjects";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import ForgotTokenRepository from "@application/usecases/user/ForgotPassword/interfaces/ForgotTokenRepository";
import TokenManager from "@application/services/TokenManager";
import MailService from "@application/services/MailService";
import { forgotTemplateFactory } from "@infra/mail/factories";
import { app } from "@main/config/configs";
import { ApplicationError } from "@application/errors";
import { capitalizeName } from "../shared/helpers/capitalizeName";
import { IForgotPassword } from "@application/usecases/user/ForgotPassword/interfaces";


export default class ForgotPassword implements IForgotPassword {
	constructor(
		private readonly repository: ForgotTokenRepository,
		private readonly tokenManager: TokenManager,
		private mailer: MailService
	) { }

	public async execute(email: string): Promise<ApplicationError | void> {
		const user = await this.repository.findByEmail(email);
		if (!user) return new UserNotFound();

		const now = new Date();
		user.forgotToken = this.tokenManager.generateToken({
			id: user.id
		}, now.setTime(now.getTime() + 60 * 60)); // 1 hour
		user.updatedAt = new Date();

		await this.repository.doUpdate(user);

		// send mail
		const messageHTMLBody = await forgotTemplateFactory({
			confirm_link: `${app.frontend_url}/change-password/${email}/${user.forgotToken}`,
			first_name: capitalizeName(user.firstName)
		});

		this.mailer.send(
			[new Email(email)],
			{
				subject: "Recuperação de senha",
				body: messageHTMLBody
			}).catch(e => console.error("[Error on sending forgot token mail] => ", e));
	}
}
