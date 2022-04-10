import { ApplicationError } from "@application/errors";


export interface RegisterEmailUserRepository {
    findByConfirmLink(confirmLink: string): Promise<boolean>;
    removeConfirmLink(confirmLink: string): Promise<void>;
}

export interface RegisterEmailConfirmation {
    execute(confirmLink: string): Promise<ApplicationError | boolean>;
}