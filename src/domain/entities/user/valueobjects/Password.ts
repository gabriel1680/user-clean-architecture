import InvalidPasswordError from "../errors/InvalidPasswordError";


export default class Password
{
    public value: string;

    private static minLength = 5;

    constructor (password: string) {
        if (!this.isValid(password)) throw new InvalidPasswordError();
        this.value = password;
    }

    private isValid(password: string): boolean {
        return password && password.length >= Password.minLength;
    }
}