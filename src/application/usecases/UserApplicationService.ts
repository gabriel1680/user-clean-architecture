import { User } from "@domain/model/user";
import UserNotFound from "./user/Find/UserNotFound";
import { UserRepository } from "./user/shared/interfaces";

export default abstract class UserApplicationService {
    constructor(private readonly userRepository: UserRepository) {}

    protected async getUserOrFail(email: string): Promise<User | never> {
        const user = this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }
}
