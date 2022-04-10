import { InvalidParametersError } from "@application/errors";
import { Password } from "@domain/entities/user/valueobjects";
import { HashPasswordService } from "@domain/services";
import ForgotTokenRepository from "@application/usecases/user/ForgotPassword/interfaces/ForgotTokenRepository";
import { InvalidForgotToken } from "@application/usecases/user/ForgotPassword/Errors";
import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"
import TokenManager from "@application/services/TokenManager";
import { IRecoveryAccountFromForgotToken } from "@application/usecases/user/ForgotPassword/interfaces";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";

export default class RecoveryAccountFromForgotToken implements IRecoveryAccountFromForgotToken {
	constructor(
		private readonly repository: ForgotTokenRepository,
		private readonly hashService: HashPasswordService,
		private readonly token: TokenManager
	) { }

	public async execute(
		email: string,
		forgotToken: string,
		newPassword: string
	): Promise<ApplicationError | DomainError | void> {
		if (!email || !forgotToken) return new InvalidParametersError();

		try { new Password(newPassword); } catch (e) { return e }

		const user = await this.repository.findByEmail(email);
		if (!user) return new UserNotFound();

		if (user.forgotToken !== forgotToken || !this.token.verify(forgotToken)) {
			return new InvalidForgotToken();
		}

		user.forgotToken = null;
		user.password = this.hashService.hash(newPassword);
		user.updatedAt = new Date();

		await this.repository.doUpdate(user);
	}
}