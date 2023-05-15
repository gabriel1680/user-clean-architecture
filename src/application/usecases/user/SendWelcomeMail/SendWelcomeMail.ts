import MailService from "@application/services/MailService";
import Email from "@domain/model/user/Email";
import { welcomeTemplateFactory } from "@infra/mail/factories";
import WelcomeMailSender from "@application/usecases/user/SendWelcomeMail/WelcomeMailSender.interface";
import { app } from "@main/config/configs";
import { capitalizeName } from "../shared/helpers/capitalizeName";

interface Data {
    confirmLink: string;
    user: {
        firstName: string;
        email: string;
    };
}

export default class SendWelcomeMail implements WelcomeMailSender {
    constructor(private mailer: MailService) {}

    public async execute({
        confirmLink,
        user: { firstName, email },
    }: Data): Promise<void> {
        const messageHTMLBody = await welcomeTemplateFactory({
            confirm_link: app.base_url + confirmLink,
            first_name: capitalizeName(firstName),
        });

        await this.mailer.send([new Email(email)], {
            subject: "Confirmação de conta",
            body: messageHTMLBody,
        });
    }
}
