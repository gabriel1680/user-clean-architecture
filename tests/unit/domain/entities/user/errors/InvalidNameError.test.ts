import { InvalidNameError } from "../../../../../../src/domain/entities/user/errors";


describe("Unit Tests of InvaldNameError", () => {
    it("Should be able to create a new instance of Error", () => {
        const error = new InvalidNameError();
        return expect(error).toBeInstanceOf(Error);
    });

    it("Should be able to throw", () => {
        const throwError = () => { throw new InvalidNameError() };
        return expect(throwError).toThrowError();
    });

    it("Should be able to return a message", () => {
        const error = new InvalidNameError();
        return expect(error.message).toBe("Nome inválido");
    });
});