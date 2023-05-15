import { InvalidRoleError } from "@domain/entities/user/errors";
import { Role } from "@domain/entities/user/valueobjects";

describe("Unit Tests of Role Value Object", () => {
    it("Should be able to create an instance by passing all correct valid args", () => {
        const roles = ["admin", "boss", "intern", "employee"];
        roles.forEach((roleItem) => {
            const role = new Role(roleItem);
            return expect(role.value).toBe(roleItem);
        });
    });

    it("Should not be able to create an instance by receiving empty role", () => {
        const attemptToCreateEmptyRole = () => new Role("");
        return expect(attemptToCreateEmptyRole).toThrow(InvalidRoleError);
    });

    it("Should not be able to create an instance by receiving an invalid role", () => {
        const attemptToCreateWrongRole = () => new Role("abacate");
        return expect(attemptToCreateWrongRole).toThrow(InvalidRoleError);
    });
});
