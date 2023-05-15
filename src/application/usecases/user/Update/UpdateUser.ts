import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { ApplicationError } from "@application/errors";
import DomainError from "@domain/model/shared/DomainError";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { UpdateRepository } from "@application/interfaces/DefaultRepositories";
import { InvalidParametersError } from "@application/errors";
import UserUpdater from "@application/usecases/user/Update/UserUpdater";
import User from "@domain/model/user/User";

export type UpdateUserPayload = {
    firstName: string;
    lastName: string;
};

export default class UpdateUser implements UserUpdater {
    constructor(private readonly repository: UpdateRepository<User>) {}

    public async execute(
        id: string,
        { firstName, lastName }: UpdateUserPayload
    ): Promise<ApplicationError | DomainError | UserViewDTO> {
        if (!id || !firstName || !lastName) return new InvalidParametersError();

        const user = await this.repository.findById(id);
        if (!user) return new UserNotFound();

        try {
            user.changeName(firstName, lastName);
        } catch (e) {
            return e;
        }

        await this.repository.doUpdate(user);

        return new UserToView(user);
    }
}
