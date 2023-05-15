import { InvalidRoleError } from "@domain/model/user/Errors";

describe("Unit Tests of InvaldRoleError", () => {
    it("Should be able to create a new instance of Error", () => {
        const error = new InvalidRoleError();
        return expect(error).toBeInstanceOf(Error);
    });

    it("Should be able to throw", () => {
        const throwError = () => {
            throw new InvalidRoleError();
        };
        return expect(throwError).toThrowError();
    });

    it("Should be able to return a message", () => {
        const error = new InvalidRoleError();
        return expect(error.message).toBe("Tipo de cargo inválido");
    });
});
