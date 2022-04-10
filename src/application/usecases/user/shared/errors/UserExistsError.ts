import { ApplicationError } from "@application/errors";

export default class UserExistsError extends Error implements ApplicationError {
    constructor() {
        super("O email informado já existe");
    }
}