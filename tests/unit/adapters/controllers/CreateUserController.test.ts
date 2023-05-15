import { ApplicationError } from "@application/errors";
import CreatedUserResponse from "@application/usecases/user/Create/interfaces/CreatedUserResponse";
import UserData from "@application/usecases/user/Create/interfaces/UserData";
import DomainError from "@domain/model/shared/DomainError";
import { CreateUserController } from "@adapters/presentation/controllers/user";
import UserCreator from "@application/usecases/user/Create/interfaces/UserCreator.interface";
import WelcomeMailSender from "@application/usecases/user/SendWelcomeMail/WelcomeMailSender.interface";

class FakeCreateUser implements UserCreator {
    async execute(
        data: UserData
    ): Promise<DomainError | ApplicationError | CreatedUserResponse> {
        return {
            user: {
                firstName: "gabriel",
                lastName: "lopes",
                email: "gabriel.lopes@gmail.com",
                role: "admin",
                id: "any_id_string",
                createdAt: new Date("2021-08-18"),
                updatedAt: new Date("2021-08-18"),
            },
            confirmLink: "https://any-address-url.com",
        };
    }
}

class FakeWelcomeMailSender implements WelcomeMailSender {
    async execute(data: CreatedUserResponse): Promise<void> {}
}

describe("Unit Tests Of Create User Controller", () => {
    const userData: UserData = {
        firstName: "gabriel",
        lastName: "lopes",
        email: "gabriel.lopes@gmail.com",
        role: "admin",
        password: "any-password",
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should be able to call correctly the services", async () => {
        const fakeCreator = new FakeCreateUser();
        const spyOnCreator = jest.spyOn(fakeCreator, "execute");
        const fakeMailSender = new FakeWelcomeMailSender();
        const spyOnSender = jest.spyOn(fakeMailSender, "execute");
        const createUserController = new CreateUserController(
            fakeCreator,
            fakeMailSender
        );
        await createUserController.handle(userData);

        expect(spyOnCreator).toHaveBeenCalledTimes(1);
        expect(spyOnCreator).toHaveBeenCalledWith(userData);
        expect(spyOnSender).toHaveBeenCalledTimes(1);
        return expect(spyOnSender).toHaveBeenCalledWith({
            user: {
                firstName: "gabriel",
                lastName: "lopes",
                email: "gabriel.lopes@gmail.com",
                role: "admin",
                id: "any_id_string",
                createdAt: new Date("2021-08-18"),
                updatedAt: new Date("2021-08-18"),
            },
            confirmLink: "https://any-address-url.com",
        });
    });

    it("should be able to create a user", async () => {
        const fakeCreator = new FakeCreateUser();
        const fakeMailSender = new FakeWelcomeMailSender();
        const createUserController = new CreateUserController(
            fakeCreator,
            fakeMailSender
        );
        const response = await createUserController.handle(userData);

        expect(response.statusCode).toBe(201);
        return expect(response.body).toStrictEqual({
            firstName: "gabriel",
            lastName: "lopes",
            email: "gabriel.lopes@gmail.com",
            role: "admin",
            id: "any_id_string",
            createdAt: new Date("2021-08-18"),
            updatedAt: new Date("2021-08-18"),
        });
    });

    it("should be able to return bad request http statuses by receiving empty parameters", async () => {
        const invalidUsers: UserData[] = [
            {
                firstName: "",
                lastName: "pereira",
                email: "cleber.teste@gmail.com",
                password: "12345678",
                role: "admin",
            },
            {
                firstName: "cleber",
                lastName: "",
                email: "cleber.teste@gmail.com",
                password: "12345678",
                role: "admin",
            },
            {
                firstName: "cleber",
                lastName: "jonatan",
                email: "",
                password: "12345678",
                role: "admin",
            },
            {
                firstName: "cleber",
                lastName: "jonatan",
                email: "gabriel.lopes@hotmail.com",
                password: "",
                role: "admin",
            },
            {
                firstName: "cleber",
                lastName: "jonatan",
                email: "gabriel.lopes@hotmail.com",
                password: "123456",
                role: "",
            },
        ];
        const fakeCreator = new FakeCreateUser();
        const fakeMailSender = new FakeWelcomeMailSender();
        const createUserController = new CreateUserController(
            fakeCreator,
            fakeMailSender
        );

        await Promise.all(
            invalidUsers.map(async (invalidBodyRequest) => {
                const response = await createUserController.handle(
                    invalidBodyRequest
                );
                const { statusCode } = response;
                return expect(statusCode).toBe(400);
            })
        );
    });

    it("should be able to return bad request statuses", async () => {
        const fakeCreator = new FakeCreateUser();
        const fakeMailSender = new FakeWelcomeMailSender();
        // @ts-ignore
        FakeCreateUser.prototype.execute = jest.fn(() => new Error("test"));
        const createUserController = new CreateUserController(
            fakeCreator,
            fakeMailSender
        );
        const response = await createUserController.handle(userData);
        return expect(response.statusCode).toBe(400);
    });

    it("should be able to catch an error", async () => {
        const fakeCreator = new FakeCreateUser();
        const fakeMailSender = new FakeWelcomeMailSender();
        FakeCreateUser.prototype.execute = jest.fn(() => {
            throw new Error("Some unexpected error");
        });
        const createUserController = new CreateUserController(
            fakeCreator,
            fakeMailSender
        );
        const response = await createUserController.handle(userData);
        return expect(response.statusCode).toBe(500);
    });
});
