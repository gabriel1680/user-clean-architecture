export default class InternalServerError extends Error {
    constructor(message: string) {        
        super(`Internal Server Error: ${message}.`);
        this.name = 'Internal Server Error';
    }
}