import { ApplicationError } from "@application/errors";
import {
    RegisterEmailUserRepository,
    RegisterEmailConfirmation,
} from "./Interfaces";
import InvalidLinkError from "@application/usecases/user/RegisterEmailConfirmation/Errors";
import { InvalidParametersError } from "@application/errors";

export default class ConfirmRegisterEmail implements RegisterEmailConfirmation {
    constructor(private userRepository: RegisterEmailUserRepository) {}

    async execute(confirmLink: string): Promise<ApplicationError | boolean> {
        if (!confirmLink) return new InvalidParametersError();

        if (!(await this.userRepository.findByConfirmLink(confirmLink)))
            return new InvalidLinkError();

        await this.userRepository.removeConfirmLink(confirmLink);
    }
}
