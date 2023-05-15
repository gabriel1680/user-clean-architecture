import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { ListRepository } from "@application/interfaces/DefaultRepositories";
import { UserLister } from "@application/usecases/user/Find/interfaces/UserFinder";
import User from "@domain/model/user/User";

export default class ListUsers implements UserLister {
    constructor(private userRepository: ListRepository<User>) {}

    public async execute(): Promise<UserViewDTO[]> {
        const users = await this.userRepository.list();
        return users.map((user) => new UserToView(user));
    }
}
