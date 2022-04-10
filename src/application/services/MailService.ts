import { Email } from "@domain/entities/user/valueobjects";
import ApplicationService from "@application/interfaces/ApplicationService";

export default interface MailService extends ApplicationService {
    send(
        addressees: Email[],
        message: {
            subject: string;
            body: string;
            attachments?: any[]
        }): Promise<void>;
}