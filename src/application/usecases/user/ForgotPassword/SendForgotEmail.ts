import MailService from "@application/services/MailService";
import { forgotTemplateFactory } from "@infra/mail/factories";
import { app } from "@main/config/configs";
import { Email } from "@domain/entities/user/valueobjects";
import { capitalizeName } from "../shared/helpers/capitalizeName";


export interface ForgotMail {
	execute({ email, firstName, forgotToken }: SendForgotData): Promise<void>
}

type SendForgotData = {
	email: string,
	firstName: string,
	forgotToken: string
};

export default class SendForgotEmail {
	constructor(
		private mailer: MailService
	) { }

	public async execute({ email, firstName, forgotToken }: SendForgotData): Promise<void> {
		const messageHTMLBody = await forgotTemplateFactory({
			confirm_link: `${app.frontend_url}/${email}/${forgotToken}`,
			first_name: capitalizeName(firstName)
		});

		await this.mailer.send(
			[new Email(email)],
			{
				subject: "Recuperação de senha",
				body: messageHTMLBody
			});
	}
}