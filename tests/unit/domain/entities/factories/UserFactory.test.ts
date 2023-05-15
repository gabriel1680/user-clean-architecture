import User from "@domain/entities/user/User";
import { UserFactory } from "@domain/factories";

describe("Unit Tests of UserFactory", () => {
    it("Should be able to create a user instance", () => {
        const user = UserFactory.create({
            id: "asd",
            firstName: "gabriel",
            lastName: "lopes",
            email: "gabriel.lopes@gmail.com",
            password: "12345678",
            role: "admin",
        });
        return expect(user).toBeInstanceOf(User);
    });

    it("Should be able to create a user instance", () => {
        const userOrError = UserFactory.create({
            id: "",
            firstName: "gabriel",
            lastName: "lopes",
            email: "gabriel.lopes@gmail.com",
            password: "1234",
            role: "admin",
        });
        return expect(userOrError).toBeInstanceOf(Error);
    });
});
