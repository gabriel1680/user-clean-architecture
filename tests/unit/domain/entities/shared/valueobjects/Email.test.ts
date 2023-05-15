import { InvalidEmailError } from "@domain/entities/user/errors";
import Email from "@domain/entities/user/valueobjects/Email";

describe("Unit Tests of Email Value Object", () => {
    const validEmail = "gabriel.lopes@gmail.com";

    it("Should be able to create an instance", () => {
        const email = new Email(validEmail);
        return expect(email.address).toBe(validEmail);
    });

    it("Should not be able to instanceate by receiving empty email", () => {
        const attemptToCreateEmptyEmail = () => new Email("");
        expect(attemptToCreateEmptyEmail).toThrow(InvalidEmailError);
        return expect(attemptToCreateEmptyEmail).toThrowError("Email inválido");
    });

    it("Should not be able to instanceate by receiving an email with less than 5 characters", () => {
        const attemptToCreateInvalidEmail = () => new Email("abacate@cleber");
        expect(attemptToCreateInvalidEmail).toThrow(InvalidEmailError);
        return expect(attemptToCreateInvalidEmail).toThrowError(
            "Email inválido"
        );
    });
});
