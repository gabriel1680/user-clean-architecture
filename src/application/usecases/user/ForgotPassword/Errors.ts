import { ApplicationError } from "@application/errors";

export class InvalidForgotLink extends Error implements ApplicationError {
	constructor() {
		super("Link inválido");
	}
}

export class InvalidForgotToken extends Error implements ApplicationError {
	constructor() {
		super("Token inválido");
	}
}