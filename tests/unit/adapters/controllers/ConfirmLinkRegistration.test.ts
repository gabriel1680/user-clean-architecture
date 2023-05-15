import { ConfirmRegisterEmailController } from "@adapters/presentation/controllers/user";
import { RegisterEmailConfirmation } from "@application/usecases/user/RegisterEmailConfirmation/Interfaces";
import { ApplicationError } from "@application/errors";
import Errors from "@application/usecases/user/RegisterEmailConfirmation/Errors";

class FakeConfirmEmailLink implements RegisterEmailConfirmation {
    async execute(confirmLink: string): Promise<ApplicationError | boolean> {
        return true;
    }
}

describe("Unit Tests Of ConfirmRegisterEmailController", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should be able to call correctly applications functions", async () => {
        const fakeConfirmEmailLink = new FakeConfirmEmailLink();
        const spy = jest.spyOn(fakeConfirmEmailLink, "execute");
        const controller = new ConfirmRegisterEmailController(
            fakeConfirmEmailLink
        );
        const link = "https://link.com";
        await controller.handle(link);
        expect(spy).toHaveBeenCalledWith(link);
        return expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should be able to return no body statuses", async () => {
        const fakeConfirmEmailLink = new FakeConfirmEmailLink();
        const controller = new ConfirmRegisterEmailController(
            fakeConfirmEmailLink
        );
        const link = "https://link.com";
        const { statusCode } = await controller.handle(link);
        return expect(statusCode).toBe(204);
    });

    it("should be able to return bad request statuses", async () => {
        const fakeConfirmEmailLink = new FakeConfirmEmailLink();
        // @ts-ignore
        fakeConfirmEmailLink.execute = jest.fn(async () => new Errors());
        const controller = new ConfirmRegisterEmailController(
            fakeConfirmEmailLink
        );
        const link = "https://link.com";
        const { statusCode, body } = await controller.handle(link);
        expect(statusCode).toBe(400);
        return expect(body).toBe("Link inválido");
    });
});
