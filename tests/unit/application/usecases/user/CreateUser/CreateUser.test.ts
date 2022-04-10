import { CreateUser} from "../../../../../../src/application/usecases/user/Create";
import UserExistsError from "../../../../../../src/application/usecases/user/shared/errors/UserExistsError";
/* @ts-ignore */
import UserRepositoryInMemory from "./UserRepositoryInMemory";


describe("Unit Tests of Create UseCase", () => {
    it("Should be able to create a new user", async () => {
        const idGenerator = { generate(): string { return Math.random().toString(); } };
        const userRepository = new UserRepositoryInMemory();
        const hashService = { hash(password: string): string { return password; } };
        const createUserUseCase = new CreateUser(hashService, userRepository, idGenerator);
        const result = await createUserUseCase.execute({
            firstName: "gabriel",
            lastName: "lopes",
            email: "gabriel.lopes@gmail.com",
            password: "12345",
            role: "admin"
        });
        /* @ts-ignore */
        return expect(result.user).toHaveProperty("id");
    });

    it("Should return an UserExistsError", async () => {
        const idGenerator = { generate(): string { return Math.random().toString(); } };
        const userRepository = new UserRepositoryInMemory();
        userRepository.exists = async (email: string): Promise<boolean> => new Promise(resolve => resolve(true));
        const hashService = { hash(password: string): string { return password; } };
        const createUserUseCase = new CreateUser(hashService, userRepository, idGenerator);
        const result = await createUserUseCase.execute({
            firstName: "gabriel",
            lastName: "lopes",
            email: "gabriel.lopes@gmail.com",
            password: "12345",
            role: "admin"
        });

        return expect(result).toBeInstanceOf(UserExistsError);
    });

    it("Should return an UserExistsError", async () => {
        const idGenerator = { generate(): string { return Math.random().toString(); } };
        const userRepository = new UserRepositoryInMemory();
        const hashService = { hash(password: string): string { return password; } };
        const createUserUseCase = new CreateUser(hashService, userRepository, idGenerator);
        const result = await createUserUseCase.execute({
            firstName: "gabriel",
            lastName: "",
            email: "gabriel.lopes@gmail.com",
            password: "12345",
            role: "admin"
        });

        return expect(result).toBeInstanceOf(Error);
    });
});