import { UserAuthenticator, UserTokenAuthenticator } from "@application/usecases/user/Authenticate/Interfaces";
import { badRequest, noBody, ok, serverError } from "@adapters/presentation/controllers/helpers/httpResponses";
import HttpResponse from "@adapters/presentation/controllers/interfaces/HttpResponse";

export default class AuthenticateUserController
{
	constructor(
			private authenticateUser: UserAuthenticator,
			private readonly authenticateByToken: UserTokenAuthenticator
	) {}

	public async handle({ 
		email, 
		password, 
		token 
	}: { email?: string, password?: string, token?: string }): Promise<HttpResponse>
	{
		try {
			if (token) {
				const responseOrError = await this.authenticateByToken.execute(token);
				if (responseOrError instanceof Error) return badRequest(responseOrError);
				return noBody();
			}
			const responseOrError = await this.authenticateUser.execute(email, password);
			if (responseOrError instanceof Error) return badRequest(responseOrError);
			return ok(responseOrError);
		} catch (error) {
			console.log("[AUTHENTICATE ERROR] =>", error);
			return serverError(error.message);
		}
	}
}