import DomainError from "../shared/DomainError";

export class InvalidNameError extends DomainError {
    constructor() {
        super("Nome inválido");
    }
}

export class InvalidPasswordError extends DomainError {
    constructor() {
        super("A senha deve conter no mínimo 5 caracteres");
    }
}

export class InvalidRoleError extends DomainError {
    constructor() {
        super("Tipo de cargo inválido");
    }
}

export class InvalidEmailError extends DomainError {
    constructor() {
        super("Email inválido");
    }
}
