import { UserExistsError } from "@application/usecases/user/shared/errors";

describe("Unit Tests of UserExistsError", () => {
    it("Should be able to create a new instance of Error", () => {
        const error = new UserExistsError();
        return expect(error).toBeInstanceOf(Error);
    });

    it("Should be able to throw", () => {
        const throwError = () => {
            throw new UserExistsError();
        };
        return expect(throwError).toThrowError();
    });

    it("Should be able to return a message", () => {
        const error = new UserExistsError();
        return expect(error.message).toBe("O email informado já existe");
    });
});
