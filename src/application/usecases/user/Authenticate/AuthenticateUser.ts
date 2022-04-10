import { UserAuthenticator, AuthenticateUserRepository }
	from "@application/usecases/user/Authenticate/Interfaces";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import TokenManager from "@application/services/TokenManager";
import { DomainError } from "@domain/errors"
import { ApplicationError } from "@application/errors";
import { Email } from "@domain/entities/user/valueobjects";
import { InvalidEmailOrPasswordError } from "@application/usecases/user/Authenticate/Errors";
import { AuthHashService } from "@application/usecases/user/Authenticate/Interfaces";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { InvalidParametersError } from "@application/errors";


export default class AuthenticateUser implements UserAuthenticator {
	constructor(
		private readonly userRepository: AuthenticateUserRepository,
		private readonly tokenManager: TokenManager,
		private readonly hashService: AuthHashService
	) { }
	public async execute(
		email: string,
		password: string
	): Promise<DomainError | ApplicationError | { user: UserViewDTO; token: string }> {
		if (!email || !password) return new InvalidParametersError();

		try { new Email(email) } catch (e) { return e }

		const user = await this.userRepository.findByEmail(email);
		if (!user) return new InvalidEmailOrPasswordError();

		const arePasswordEquals = this.hashService.compare(password, user.password);
		if (!arePasswordEquals) return new InvalidEmailOrPasswordError();

		const expiresIn = new Date();
		expiresIn.setTime(expiresIn.getTime() + 12 * 60 * 60 * 1000); // 12 horas

		const token = this.tokenManager.generateToken({ id: user.id }, expiresIn.getTime());
		return {
			user: new UserToView(user),
			token
		}
	}
}