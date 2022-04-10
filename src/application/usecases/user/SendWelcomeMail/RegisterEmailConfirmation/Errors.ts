import { ApplicationError } from "@application/errors";

export default class InvalidLinkError extends Error implements ApplicationError {
    constructor() {
        super("Link inválido");
    }
}