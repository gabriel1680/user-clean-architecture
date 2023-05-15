import { InvalidEmailError } from "./Errors";

export default class Email {
    constructor(public readonly address: string) {
        if (!this.isValid(address)) throw new InvalidEmailError();
    }

    public isValid(address: string): boolean {
        const regexp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regexp.test(address);
    }
}
