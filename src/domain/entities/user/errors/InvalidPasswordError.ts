import DomainError from "../../../errors/DomainError";


export default class InvalidPasswordError extends Error implements DomainError {
    constructor() {
        super("A senha deve conter no mínimo 5 caracteres");
    }
}