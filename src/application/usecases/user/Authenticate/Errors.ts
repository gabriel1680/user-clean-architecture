import { ApplicationError } from "@application/errors";

export class InvalidEmailOrPasswordError extends Error implements ApplicationError {
	constructor() {
		super("Email ou senha incorretos");
	}
}

export class InvalidTokenError extends Error implements ApplicationError {
	constructor() {
		super("Token inválido");
	}
}