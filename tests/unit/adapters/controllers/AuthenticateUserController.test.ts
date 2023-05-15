import { AuthenticateUserController } from "@adapters/presentation/controllers/user";
import {
    UserAuthenticator,
    UserTokenAuthenticator,
} from "@application/usecases/user/Authenticate/Interfaces";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { DomainError } from "@domain/errors";
import { ApplicationError } from "@application/errors";
import { InvalidEmailOrPasswordError } from "@application/usecases/user/Authenticate/Errors";

class FakeAuthenticator implements UserAuthenticator {
    async execute(
        email: string,
        password: string
    ): Promise<
        DomainError | ApplicationError | { user: UserViewDTO; token: string }
    > {
        return {
            user: {
                id: "ii1h23i123i2",
                firstName: "gabriel",
                lastName: "lopes",
                email: "gabriel.lopes@hotmail.com",
                role: "admin",
                createdAt: new Date("1998-08-18"),
                updatedAt: new Date("1998-08-18"),
            },
            token: "1234567token",
        };
    }
}

class FakeTokenAuthenticator implements UserTokenAuthenticator {
    async execute(
        token: string
    ): Promise<DomainError | ApplicationError | void> {
        return;
    }
}

describe("Unit Tests Of Authenticate UserMongo Controller", () => {
    const userData = {
        email: "gabriel.lopes@hotmail.com",
        password: "12345678",
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should be able to call correctly the services", async () => {
        const fakeAuthenticator = new FakeAuthenticator();
        const fakeTokenAuthenticator = new FakeTokenAuthenticator();
        const spy = jest.spyOn(fakeAuthenticator, "execute");

        const authenticateUserController = new AuthenticateUserController(
            fakeAuthenticator,
            fakeTokenAuthenticator
        );
        await authenticateUserController.handle(userData);

        expect(spy).toHaveBeenCalledTimes(1);
        return expect(spy).toHaveBeenCalledWith(
            userData.email,
            userData.password
        );
    });

    it("should be able to return user and token", async () => {
        const fakeAuthenticator = new FakeAuthenticator();
        const fakeTokenAuthenticator = new FakeTokenAuthenticator();

        const authenticateUserController = new AuthenticateUserController(
            fakeAuthenticator,
            fakeTokenAuthenticator
        );
        const response = await authenticateUserController.handle(userData);

        expect(response.statusCode).toBe(200);
        return expect(response.body).toStrictEqual({
            user: {
                id: "ii1h23i123i2",
                firstName: "gabriel",
                lastName: "lopes",
                email: "gabriel.lopes@hotmail.com",
                role: "admin",
                createdAt: new Date("1998-08-18"),
                updatedAt: new Date("1998-08-18"),
            },
            token: "1234567token",
        });
    });

    it("should not be able to return user and token by receiving either invalid parameters", async () => {
        const fakeAuthenticator = new FakeAuthenticator();
        const fakeTokenAuthenticator = new FakeTokenAuthenticator();
        // @ts-ignore
        fakeAuthenticator.execute = jest.fn(
            () => new InvalidEmailOrPasswordError()
        );
        const authenticateUserController = new AuthenticateUserController(
            fakeAuthenticator,
            fakeTokenAuthenticator
        );
        const response = await authenticateUserController.handle(userData);

        expect(response.statusCode).toBe(400);
        return expect(response.body).toBe("Email ou senha incorretos");
    });
});
