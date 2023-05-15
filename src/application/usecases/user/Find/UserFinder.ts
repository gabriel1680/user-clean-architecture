import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { ApplicationError } from "@application/errors";

export interface UserFinder {
    execute(id: string): Promise<ApplicationError | UserViewDTO>;
}
