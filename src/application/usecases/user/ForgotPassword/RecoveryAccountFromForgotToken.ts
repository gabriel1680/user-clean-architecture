import { InvalidParametersError } from "@application/errors";
import Password from "@domain/model/user/Password";
import { HashPasswordService } from "@domain/model/user/service";
import ForgotTokenRepository from "@application/usecases/user/ForgotPassword/interfaces/ForgotTokenRepository";
import { InvalidForgotToken } from "@application/usecases/user/ForgotPassword/Errors";
import { ApplicationError } from "@application/errors";
import DomainError from "@domain/model/shared/DomainError";
import TokenManager from "@application/services/TokenManager";
import { IRecoveryAccountFromForgotToken } from "@application/usecases/user/ForgotPassword/interfaces";
import UserNotFound from "@application/usecases/user/shared/errors/UserNotFound";
import User from "@domain/model/user/User";

export default class RecoveryAccountFromForgotToken
    implements IRecoveryAccountFromForgotToken
{
    constructor(
        private readonly repository: ForgotTokenRepository,
        private readonly hashService: HashPasswordService,
        private readonly token: TokenManager
    ) {}

    public async execute(
        email: string,
        forgotToken: string,
        newPassword: string
    ): Promise<ApplicationError | DomainError | void> {
        if (!email || !forgotToken) return new InvalidParametersError();

        try {
            new Password(newPassword);
        } catch (e) {
            return e;
        }

        const user = await this.repository.findByEmail(email);
        if (!user) return new UserNotFound();

        if (this.isTokenInvalid(user, forgotToken)) {
            return new InvalidForgotToken();
        }

        const hashedPassword = this.hashService.hash(newPassword);
        user.recoverPassword(hashedPassword, hashedPassword);

        await this.repository.doUpdate(user);
    }

    private isTokenInvalid(user: User, forgotToken: string) {
        return (
            user.forgotToken !== forgotToken || !this.token.verify(forgotToken)
        );
    }
}
