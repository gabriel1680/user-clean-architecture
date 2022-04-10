import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";


export interface IConfirmForgotToken {
	execute(email: string, forgotToken: string): Promise<ApplicationError | UserViewDTO>;
}

export interface IForgotPassword {
	execute(email: string): Promise<Error | void>;
}

export interface IRecoveryAccountFromForgotToken {
	execute(
		email: string,
		forgotToken: string,
		newPassword: string
	): Promise<ApplicationError | DomainError | void>
}