import DomainError from "../../../errors/DomainError";


export default class InvalidEmailError extends Error implements DomainError {
    constructor() {
        super('Email inválido');
    }
}