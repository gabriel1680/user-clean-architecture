import { DomainError } from "@domain/errors";

export class InvalidNameError extends Error implements DomainError {
  constructor() {
      super("Nome inválido");
  }
}

export class InvalidPasswordError extends Error implements DomainError {
  constructor() {
      super("A senha deve conter no mínimo 5 caracteres");
  }
}

export class InvalidRoleError extends Error implements DomainError {
  constructor() {
      super("Tipo de cargo inválido");
  }
}

export class InvalidEmailError extends Error implements DomainError {
  constructor() {
      super('Email inválido');
  }
}