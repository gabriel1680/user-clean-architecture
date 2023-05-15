import { UserTokenAuthenticator } from "@application/usecases/user/Authenticate/Interfaces";
import DomainError from "@domain/model/shared/DomainError";
import { ApplicationError } from "@application/errors";
import { InvalidParametersError } from "@application/errors";
import AuthTokenManager from "@adapters/authentication/middlewares/interfaces/AuthTokenManager";
import { FindByIdRepository } from "@application/interfaces/DefaultRepositories";
import User from "@domain/model/user/User";
import UserDoesNotExistsError from "../shared/errors";
import { InvalidTokenError } from "./Errors";

export default class AuthenticateUserByToken implements UserTokenAuthenticator {
    constructor(
        private readonly userRepository: FindByIdRepository<User>,
        private readonly tokenManager: AuthTokenManager
    ) {}
    public async execute(
        token: string
    ): Promise<DomainError | ApplicationError | void> {
        if (!token) return new InvalidParametersError();

        if (!this.tokenManager.verify(token)) return new InvalidTokenError();

        const userId = this.tokenManager.getPayload(token).sub;
        if (!userId) return new InvalidTokenError();

        const user = await this.userRepository.findById(userId);
        if (!user) return new UserDoesNotExistsError();
    }
}
