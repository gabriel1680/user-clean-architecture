import { UserFinder, UserLister } from "@application/usecases/user/Find/interfaces/UserFinder";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { badRequest, ok, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";
import { FindController } from "@adapters/presentation/controllers/interfaces/FindController";

export default class FindUserController implements FindController{
	constructor(
			private findUserById: UserFinder,
			private listUser: UserLister
	) {}

	public async handle(id?: string): Promise<HttpResponse> {
		try {
			if (!id) return ok(await this.listUser.execute());
			const responseOrError = await this.findUserById.execute(id);
			if (responseOrError instanceof Error) return badRequest(responseOrError);
			return ok(responseOrError);
		} catch (e) {
			console.log("[FIND USER CONTROLLER ERROR] =>", e);
			return serverError(e.message);
		}
	}
}