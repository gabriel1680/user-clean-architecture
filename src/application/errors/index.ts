export interface ApplicationError extends Error {}

export class InvalidParametersError extends Error implements ApplicationError {
	constructor() {
		super("Parâmetros inválidos");
	}
}