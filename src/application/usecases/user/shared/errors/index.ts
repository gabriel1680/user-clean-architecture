import { ApplicationError } from "@application/errors";

export class UserExistsError extends Error implements ApplicationError {
    constructor() {
        super("O email informado já existe");
    }
}

export default class UserDoesNotExistsError extends Error implements ApplicationError {
    constructor() {
        super("O usuário informado não existe");
    }
}