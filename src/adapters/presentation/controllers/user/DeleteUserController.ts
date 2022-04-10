import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";
import { badRequest, noBody, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";
import UserRemover from "@application/usecases/user/Delete/UserRemover";

export default class DeleteUserController {
	constructor(private readonly deleteUser: UserRemover) {}

	public async handle(id: string): Promise<HttpResponse>
	{
		try {
			const responseOrError = await this.deleteUser.execute(id);
			if (responseOrError instanceof Error) return badRequest(responseOrError);
			return noBody();
		} catch (e) {
			console.error("[Delete UserMongo Controller Error] =>", e);
			return serverError(e.message);
		}
	}
}