import { InvalidPasswordError } from "@domain/model/user/Errors";

describe("Unit Tests of InvaldPasswordError", () => {
    it("Should be able to create a new instance of Error", () => {
        const error = new InvalidPasswordError();
        return expect(error).toBeInstanceOf(Error);
    });

    it("Should be able to throw", () => {
        const throwError = () => {
            throw new InvalidPasswordError();
        };
        return expect(throwError).toThrowError();
    });

    it("Should be able to return a message", () => {
        const error = new InvalidPasswordError();
        return expect(error.message).toBe(
            "A senha deve conter no mínimo 5 caracteres"
        );
    });
});
