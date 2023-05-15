import { ApplicationError } from "@application/errors";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import DomainError from "@domain/model/shared/DomainError";

export interface IConfirmForgotToken {
    execute(
        email: string,
        forgotToken: string
    ): Promise<ApplicationError | UserViewDTO>;
}

export interface IForgotPassword {
    execute(email: string): Promise<Error | void>;
}

export interface IRecoveryAccountFromForgotToken {
    execute(
        email: string,
        forgotToken: string,
        newPassword: string
    ): Promise<ApplicationError | DomainError | void>;
}
