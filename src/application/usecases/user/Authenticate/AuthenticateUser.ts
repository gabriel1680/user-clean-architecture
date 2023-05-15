import { ApplicationError, InvalidParametersError } from "@application/errors";
import TokenManager from "@application/services/TokenManager";
import { InvalidEmailOrPasswordError } from "@application/usecases/user/Authenticate/Errors";
import {
    AuthHashService,
    AuthenticateUserRepository,
    UserAuthenticator,
} from "@application/usecases/user/Authenticate/Interfaces";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import User from "@domain/model/user/User";
import DomainError from "@domain/model/shared/DomainError";

export default class AuthenticateUser implements UserAuthenticator {
    constructor(
        private readonly userRepository: AuthenticateUserRepository,
        private readonly tokenManager: TokenManager,
        private readonly hashService: AuthHashService
    ) {}
    public async execute(
        email: string,
        password: string
    ): Promise<
        DomainError | ApplicationError | { user: UserViewDTO; token: string }
    > {
        if (!email || !password) return new InvalidParametersError();

        const user = await this.userRepository.findByEmail(email);
        if (!user) return new InvalidEmailOrPasswordError();

        if (!this.arePasswordEquals(password, user.password.value))
            return new InvalidEmailOrPasswordError();

        return {
            user: new UserToView(user),
            token: this.generateToken(user),
        };
    }

    private arePasswordEquals(password: string, userPassword: string) {
        return this.hashService.compare(password, userPassword);
    }

    private generateToken(user: User) {
        return this.tokenManager.generateToken(
            { id: user.id },
            this.getExpirationDateString()
        );
    }

    private getExpirationDateString() {
        const expiresIn = new Date();
        expiresIn.setTime(expiresIn.getTime() + 12 * 60 * 60 * 1000); // 12 horas
        return expiresIn.getTime();
    }
}
