import DomainError from "../../../errors/DomainError";


export default class InvalidNameError extends Error implements DomainError {
    constructor() {
        super("Nome inválido");
    }
}