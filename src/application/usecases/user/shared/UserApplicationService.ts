import { User } from "@domain/model/user";
import UserNotFound from "./errors/UserNotFound";
import { UserRepository } from "./interfaces";

export default abstract class UserApplicationService {
    constructor(protected readonly userRepository: UserRepository) {}

    protected async findUserOrFail(email: string): Promise<User | never> {
        const user = this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }
}
