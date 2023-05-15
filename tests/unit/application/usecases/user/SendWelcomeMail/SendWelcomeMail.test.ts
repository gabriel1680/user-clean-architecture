import SendWelcomeMail from "@application/usecases/user/SendWelcomeMail/SendWelcomeMail";
import MailService from "@application/services/MailService";
import Email from "@domain/entities/user/valueobjects/Email";
// @ts-ignore
import htmlMessage from "./buildedEmailData";

class FakeMailer implements MailService {
    async send(
        addressees: Email[],
        message: { subject: string; body: string; attachments?: any[] }
    ): Promise<void> {}
}

describe("Unit Tests of SendWelcomeMail", () => {
    it("Should be able to render and send a welcome template", async () => {
        const fakeMailer = new FakeMailer();
        const spy = jest.spyOn(fakeMailer, "send");

        const sender = new SendWelcomeMail(fakeMailer);
        await sender.execute({
            confirmLink: "/users/confirmation/123h12i3h213u12iu3",
            user: {
                firstName: "gabriel",
                email: "gabriel.lopes@gmail.com",
            },
        });
        expect(spy).toHaveBeenCalledTimes(1);
        return expect(spy).toHaveBeenCalledWith(
            [new Email("gabriel.lopes@gmail.com")],
            { subject: "Confirmação de conta", body: htmlMessage }
        );
    });
});
