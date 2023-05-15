import { InvalidPasswordError } from "@domain/entities/user/errors";
import { Password } from "@domain/entities/user/valueobjects";

describe("Unit Tests of Password Value Object", () => {
    it("Should be able to create an instance", () => {
        const passwordValidValues = [
            "12345",
            "123456",
            "1234567",
            "123456789",
            "12345678910",
        ];
        passwordValidValues.forEach((passwd) => {
            const password = new Password(passwd);
            return expect(password.value).toBe(passwd);
        });
    });

    it("Should not be able to instanceate by receiving empty password", () => {
        const attemptToCreateEmptyPassword = () => new Password("");
        return expect(attemptToCreateEmptyPassword).toThrow(
            InvalidPasswordError
        );
    });

    it("Should not be able to instanceate by receiving an password with less than 5 characters", () => {
        const attemptToCreateWrongPassword = () => new Password("1234");
        return expect(attemptToCreateWrongPassword).toThrow(
            InvalidPasswordError
        );
    });
});
