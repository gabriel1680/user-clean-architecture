import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import TokenManager from "@application/services/TokenManager";
import { InvalidForgotLink } from "@application/usecases/user/ForgotPassword/Errors";
import { AuthenticateUserRepository } from "@application/usecases/user/Authenticate/Interfaces";
import { ApplicationError } from "@application/errors";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";

export default class ConfirmForgotToken {
	constructor(
		private readonly repository: AuthenticateUserRepository,
		private readonly tokenManager: TokenManager,
	) { }

	public async execute(email: string, forgotToken: string): Promise<ApplicationError | UserViewDTO> {
		const user = await this.repository.findByEmail(email);
		if (!user) return new UserNotFound();

		if (user.forgotToken !== forgotToken || !this.tokenManager.verify(forgotToken)) {
			return new InvalidForgotLink();
		}
		return new UserToView(user);
	}
}