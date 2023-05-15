import { ApplicationError } from "@application/errors";
import DomainError from "@domain/model/shared/DomainError";

export default interface UserRemover {
    execute(id: string): Promise<ApplicationError | DomainError | void>;
}
