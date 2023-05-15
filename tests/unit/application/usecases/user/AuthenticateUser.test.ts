import AuthenticateUser from "@application/usecases/user/Authenticate/AuthenticateUser";
// @ts-ignore
import User from "@domain/entities/user/User";
import {
    Email,
    Name,
    Password,
    Role,
} from "@domain/entities/user/valueobjects";
import TokenManager from "@application/services/TokenManager";
import { InvalidEmailOrPasswordError } from "@application/usecases/user/Authenticate/Errors";
import { AuthHashService } from "@application/usecases/user/Authenticate/Interfaces";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
// @ts-ignore
import UserRepositoryInMemory from "./CreateUser/UserRepositoryInMemory";

class FakeToken implements TokenManager {
    generateToken(
        payload: string | object,
        expiresIn: string | number
    ): string {
        return "123";
    }

    verify(token: string): boolean {
        return true;
    }
}

class FakeHash implements AuthHashService {
    compare(password: string, hash: string): boolean {
        return true;
    }
}

describe("Unit Tests Os Authenticate UserMongo", () => {
    const user: User = new User(
        "as7a8sdas8da",
        new Email("gabriel.lopes@hotmail.com"),
        new Password("12345678"),
        new Name("gabriel", "Lopes"),
        new Role("admin")
    );

    const userViewData: UserViewDTO = new UserToView(user);

    it("should be able to call correctly all the services", async () => {
        const userRepository = new UserRepositoryInMemory();
        await userRepository.persist(user); // creates a user for the test

        const spyOnRepo = jest.spyOn(userRepository, "findByEmail");
        const tokenService = new FakeToken();
        const spyOnToken = jest.spyOn(tokenService, "generateToken");
        const hashService = new FakeHash();
        const spyOnHash = jest.spyOn(hashService, "compare");
        const authenticate = new AuthenticateUser(
            userRepository,
            tokenService,
            hashService
        );

        const email = "gabriel.lopes@hotmail.com";
        const password = "12345678";
        await authenticate.execute(email, password);

        expect(spyOnRepo).toBeCalledTimes(1);
        expect(spyOnRepo).toBeCalledWith(email);
        expect(spyOnToken).toBeCalledTimes(1);
        expect(spyOnHash).toBeCalledTimes(1);
        return expect(spyOnHash).toBeCalledWith(password, user.password);
    });

    it("should be able to authenticate correctly user", async () => {
        const userRepository = new UserRepositoryInMemory();
        await userRepository.persist(user); // creates a user for the test

        const tokenService = new FakeToken();
        const hashService = new FakeHash();
        const authenticate = new AuthenticateUser(
            userRepository,
            tokenService,
            hashService
        );
        const response = await authenticate.execute(
            "gabriel.lopes@hotmail.com",
            "12345678"
        );
        // @ts-ignore
        expect(response.user).toStrictEqual(userViewData);
        // @ts-ignore
        return expect(response.token).toBe("123");
    });

    it("should not be able to authenticate a non existent user", async () => {
        const userRepository = new UserRepositoryInMemory();
        const tokenService = new FakeToken();
        const hashService = new FakeHash();
        const authenticate = new AuthenticateUser(
            userRepository,
            tokenService,
            hashService
        );
        const response = await authenticate.execute(
            "gabriel.lopes@hotmail.com",
            "12345678"
        );
        return expect(response).toBeInstanceOf(InvalidEmailOrPasswordError);
    });

    it("should not be able to authenticate a user with wrong password", async () => {
        const userRepository = new UserRepositoryInMemory();
        await userRepository.persist(user); // creates a user for the test

        const tokenService = new FakeToken();
        const hashService = new FakeHash();
        hashService.compare = jest.fn(() => false);
        const authenticate = new AuthenticateUser(
            userRepository,
            tokenService,
            hashService
        );
        const response = await authenticate.execute(
            "gabriel.lopes@hotmail.com",
            "12345678"
        );
        return expect(response).toBeInstanceOf(InvalidEmailOrPasswordError);
    });
});
