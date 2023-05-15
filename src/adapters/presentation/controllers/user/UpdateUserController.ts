import UserUpdater from "@application/usecases/user/Update/UserUpdater";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import {
    badRequest,
    noBody,
    serverError,
} from "@adapters/presentation/controllers/helpers/httpResponses";
import { UpdateUserPayload } from "@application/usecases/user/Update/UpdateUser";

export default class UpdateUserController {
    constructor(private readonly updateUser: UserUpdater) {}

    public async handle(
        id: string,
        payload: UpdateUserPayload
    ): Promise<HttpResponse> {
        try {
            const responseOrError = await this.updateUser.execute(id, payload);
            if (responseOrError instanceof Error)
                return badRequest(responseOrError);
            return noBody();
        } catch (e) {
            console.error("[Update UserMongo Controller Error] =>", e);
            return serverError(e.message);
        }
    }
}
