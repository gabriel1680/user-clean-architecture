import { ApplicationError } from "@application/errors";

export default class UserDoesNotExistsError extends Error implements ApplicationError {
    constructor() {
        super("O usuário informado não existe");
    }
}