import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"

export default interface UserPasswordUpdater {
	execute(id: string, password: string): Promise<ApplicationError | DomainError | void>;
}