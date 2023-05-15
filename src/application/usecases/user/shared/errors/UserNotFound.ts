import { ApplicationError } from "@application/errors";

export default class UserNotFound extends Error implements ApplicationError {
	constructor() {
		super("Usuário não encontrado");
	}
}