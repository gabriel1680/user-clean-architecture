import {
    CreateRepository,
    DeleteRepository, ExistsByIdRepository,
    FindByIdRepository,
    ListRepository,
    UpdateRepository
} from "@application/interfaces/DefaultRepositories";
import { RegisterEmailUserRepository }
    from "@application/usecases/user/RegisterEmailConfirmation/Interfaces";
import { AuthenticateUserRepository } from "@application/usecases/user/Authenticate/Interfaces";
import ForgotTokenRepository from "@application/usecases/user/ForgotPassword/interfaces/ForgotTokenRepository";
import User from "@domain/entities/user/User";

export default interface UserRepository extends
    RegisterEmailUserRepository,
    AuthenticateUserRepository,
    ForgotTokenRepository,
    CreateRepository<User>,
    ExistsByIdRepository,
    ListRepository<User>,
    FindByIdRepository<User>,
    UpdateRepository<User>,
    DeleteRepository<User>
{
    exists(email: string): Promise<boolean>;
}