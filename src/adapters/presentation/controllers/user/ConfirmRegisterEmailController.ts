import { RegisterEmailConfirmation } from "@application/usecases/user/RegisterEmailConfirmation/Interfaces";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { badRequest, noBody, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";

export default class ConfirmRegisterEmailController {
    constructor(private confirmEmailLink: RegisterEmailConfirmation) {}

    async handle(confirmLink: string): Promise<HttpResponse> {
        try {
            const response = await this.confirmEmailLink.execute(confirmLink);
            if (response instanceof Error) return badRequest(response);
            return noBody();
        } catch (error) {
            return serverError(error.message);
        }
    }
}