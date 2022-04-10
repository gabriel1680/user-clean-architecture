import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors";

export default interface UserRemover {
	execute(id: string): Promise<ApplicationError | DomainError | void>;
}