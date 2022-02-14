import DomainError from "../../../errors/DomainError";


export default class InvalidRoleError extends Error implements DomainError {
    constructor() {
        super("Tipo de cargo inválido");
    }
}