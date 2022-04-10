import UserUpdater from "@application/usecases/user/Update/interfaces/UserUpdater";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { badRequest, noBody, ok, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";
import { UpdateUserPayload } from "@application/usecases/user/Update/UpdateUser";
import UserPasswordUpdater from "@application/usecases/user/Update/interfaces/UserPasswordUpdater";

export default class UpdateUserController {
	constructor(
			private readonly updateUser: UserUpdater,
			private readonly updatePassword: UserPasswordUpdater
			) {}

	public async handle(id: string, payload: UpdateUserPayload, password?: string): Promise<HttpResponse>
	{
		try {
			if (password) { // password update
				const responseOrError = await this.updatePassword.execute(id, password);
				if (responseOrError instanceof Error) return badRequest(responseOrError);
				return noBody();
			}

			const responseOrError = await this.updateUser.execute(id, payload);
			if (responseOrError instanceof Error) return badRequest(responseOrError);
			return ok(responseOrError);
		} catch (e) {
			console.error("[Update UserMongo Controller Error] =>", e);
			return serverError(e.message);
		}
	}
}