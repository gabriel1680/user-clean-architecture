import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import DomainError from "@domain/model/shared/DomainError";
import { ApplicationError } from "@application/errors";
import User from "@domain/model/user/User";

export interface UserAuthenticator {
    execute(
        email: string,
        password: string
    ): Promise<
        DomainError | ApplicationError | { user: UserViewDTO; token: string }
    >;
}

export interface UserTokenAuthenticator {
    execute(token: string): Promise<DomainError | ApplicationError | void>;
}

export interface AuthHashService {
    compare(password: string, hash: string): boolean;
}

export interface AuthenticateUserRepository {
    findByEmail(email: string): Promise<User>;
}
