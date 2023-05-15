import UserRepository from "@application/usecases/user/shared/interfaces/UserRepository";
import { AuthenticateUserRepository } from "@application/usecases/user/Authenticate/Interfaces";
import User from "@domain/model/user/User";

export default class UserRepositoryInMemory
    implements UserRepository, AuthenticateUserRepository
{
    private users: User[] = [];

    constructor() {}

    async existsById(id: string): Promise<boolean> {
        return Boolean(this.users.find((u) => u.id === id));
    }

    async persist(user: User): Promise<void> {
        this.users.push(user);
    }

    async exists(email: string): Promise<boolean> {
        return !!this.users.find((user) => user.email.address === email);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email.address === email);
    }

    doDelete(model: User): Promise<void> {
        return Promise.resolve(undefined);
    }

    doUpdate(user: User): Promise<void> {
        return Promise.resolve(undefined);
    }

    findByConfirmLink(confirmLink: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    findById(id: string | number): Promise<User> {
        return Promise.resolve(undefined);
    }

    list(): Promise<User[]> {
        return Promise.resolve([]);
    }

    removeConfirmLink(confirmLink: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
