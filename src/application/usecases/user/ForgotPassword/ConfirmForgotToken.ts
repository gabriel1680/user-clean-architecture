import UserNotFound from "@application/usecases/user/shared/errors/UserNotFound";
import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import TokenManager from "@application/services/TokenManager";
import { InvalidForgotLink } from "@application/usecases/user/ForgotPassword/Errors";
import { AuthenticateUserRepository } from "@application/usecases/user/Authenticate/Interfaces";
import { ApplicationError } from "@application/errors";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import User from "@domain/model/user/User";

export default class ConfirmForgotToken {
    constructor(
        private readonly repository: AuthenticateUserRepository,
        private readonly tokenManager: TokenManager
    ) {}

    public async execute(
        email: string,
        forgotToken: string
    ): Promise<ApplicationError | UserViewDTO> {
        const user = await this.repository.findByEmail(email);
        if (!user) return new UserNotFound();

        if (this.isTokenInvalid(user, forgotToken)) {
            return new InvalidForgotLink();
        }

        user.requestChangePassword(forgotToken);

        return new UserToView(user);
    }

    private isTokenInvalid(user: User, forgotToken: string) {
        return (
            user.forgotToken !== forgotToken ||
            !this.tokenManager.verify(forgotToken)
        );
    }
}
