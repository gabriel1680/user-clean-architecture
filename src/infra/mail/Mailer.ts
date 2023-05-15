import { createTransport } from "nodemailer";
import { Attachment, Envelope } from "nodemailer/lib/mailer";

import { mail as mailConfig } from "@main/config/configs";
import User from "@domain/entities/user/User";
import { UserFactory } from "@domain/factories";
import { Email } from "@domain/entities/user/valueobjects";
import MailService from "@application/services/MailService";

interface MailMessage {
    subject: string;
    body: string;
    attachments: any[];
}

export class Mailer implements MailService {
    // @ts-ignore
    private _nodeMailerTransporter = createTransport(mailConfig.nodemailer);

    private _from: User;

    constructor(from?: User) {
        this._from = from || this.createDefaultEmailSender();
    }

    private createDefaultEmailSender(): User {
        return UserFactory.create({
            id: "1",
            email: "gabriel.lopes1680@gmail.com",
            password: "12345678",
            firstName: "gabriel",
            lastName: "lopes",
            role: "admin",
        }) as User;
    }

    public async send(
        addressees: Email[],
        message: MailMessage
    ): Promise<void> {
        await this._nodeMailerTransporter.sendMail({
            from: `"${this._from.fullName}" <${this._from.emailAddress}>`,
            to: this.buildAddresseesString(addressees),
            subject: message.subject,
            html: message.body,
            attachments: !message.attachments
                ? undefined
                : this.buildAttachments(message),
        });
    }

    public async sendEnvelope(envelope: Envelope): Promise<void> {
        await this._nodeMailerTransporter.sendMail({
            envelope: envelope,
        });
    }

    private buildAddresseesString(addressees: Email[]): string {
        let addresseesString = [];
        addressees.map((addressee) => {
            addresseesString.push(addressee.address as never);
        });
        return addresseesString.join(", ");
    }

    private buildAttachments(message: MailMessage): Attachment[] {
        let attachments = [];
        message.attachments.map((attachment) => {
            attachments.push(attachment as never);
        });
        return attachments;
    }
}
