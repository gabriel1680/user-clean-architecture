import { InvalidEmailError } from "@domain/model/user/Errors";

describe("Unit Tests of InvaldEmailError", () => {
    it("Should be able to create a new instance of Error", () => {
        const error = new InvalidEmailError();
        return expect(error).toBeInstanceOf(Error);
    });

    it("Should be able to throw", () => {
        const throwError = () => {
            throw new InvalidEmailError();
        };
        return expect(throwError).toThrowError();
    });

    it("Should be able to return a message", () => {
        const error = new InvalidEmailError();
        return expect(error.message).toBe("Email inválido");
    });
});
