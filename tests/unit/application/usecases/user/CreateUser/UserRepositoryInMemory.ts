import UserDbDTO from "../../../../../../src/application/usecases/user/shared/interfaces/UserDbDTO";
import UserRepository from "../../../../../../src/application/usecases/user/shared/interfaces/UserRepository";
import { AuthenticateUserRepository }
    from "../../../../../../src/application/usecases/user/Authenticate/Interfaces";

export default class UserRepositoryInMemory implements UserRepository, AuthenticateUserRepository
{
    private users: UserDbDTO[] = [];

    constructor() {}
    
    async persist(user: UserDbDTO): Promise<void>
    {
        this.users.push(user);
    }

    async exists(email: string): Promise<boolean>
    {
        return !!this.users.find(user => user.email === email);
    }

    async findByEmail(email: string): Promise<UserDbDTO> {
        return this.users.find(user => user.email === email);
    }

    doDelete(model: UserDbDTO): Promise<void> {
        return Promise.resolve(undefined);
    }

    doUpdate(user: UserDbDTO): Promise<void> {
        return Promise.resolve(undefined);
    }

    findByConfirmLink(confirmLink: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    findById(id: string | number): Promise<UserDbDTO> {
        return Promise.resolve(undefined);
    }

    list(): Promise<UserDbDTO[]> {
        return Promise.resolve([]);
    }

    removeConfirmLink(confirmLink: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
