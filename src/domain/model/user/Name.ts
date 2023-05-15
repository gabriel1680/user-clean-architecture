import { InvalidNameError } from "./Errors";

export default class Name {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string
    ) {
        if (!firstName || !lastName) throw new InvalidNameError();
    }

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
