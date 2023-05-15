import { ApplicationError } from "@application/errors";
import DomainError from "@domain/model/shared/DomainError";
import UserData from "./UserData";
import CreatedUserResponse from "@application/usecases/user/Create/interfaces/CreatedUserResponse";

export default interface UserCreator {
    execute(
        data: UserData
    ): Promise<DomainError | ApplicationError | CreatedUserResponse>;
}
