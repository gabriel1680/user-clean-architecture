import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { UpdateUserPayload } from "@application/usecases/user/Update/UpdateUser";

export default interface UserUpdater {
	execute(id: string, payload: UpdateUserPayload): Promise<ApplicationError | DomainError | UserViewDTO>;
}