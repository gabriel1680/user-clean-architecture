import { ApplicationError, InvalidParametersError } from "@application/errors";
import UserApplicationService from "@application/usecases/user/shared/UserApplicationService";
import DomainError from "@domain/model/shared/DomainError";
import UserRemover from "./UserRemover";

export default class DeleteUser
    extends UserApplicationService
    implements UserRemover
{
    public async execute(email: string): Promise<Output> {
        if (!email) return new InvalidParametersError();

        const user = await this.findUserOrFail(email);

        await this.userRepository.doDelete(user);
    }
}

type Output = ApplicationError | DomainError | void;
