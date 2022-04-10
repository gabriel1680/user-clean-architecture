import {
	AuthenticateUserController, ConfirmRegisterEmailController,
	CreateUserController, DeleteUserController,
	FindUserController, ForgotPasswordController, UpdateUserController
} from "@adapters/presentation/controllers/user";
import CreateUser from "@application/usecases/user/Create/CreateUser";
import SendWelcomeMail from "@application/usecases/user/SendWelcomeMail/SendWelcomeMail";
import { Mailer } from "@infra/mail";
import Hasher from "@infra/services/Hasher";
import IdGenerator from "@infra/services/IdGenerator";
import AuthenticateUser from "@application/usecases/user/Authenticate/AuthenticateUser";
import JWT from "@infra/services/JWT";
import { jwt } from "@main/config/configs";
import { FindController } from "@adapters/presentation/controllers/interfaces/FindController";
import FindUserById from "@application/usecases/user/Find/FindUserById";
import ListUsers from "@application/usecases/user/Find/ListUsers";
import DeleteUser from "@application/usecases/user/Delete/DeleteUser";
import ConfirmRegisterEmail from "@application/usecases/user/RegisterEmailConfirmation/ConfirmRegisterEmail";
import { UpdatePassword, UpdateUser } from "@application/usecases/user/Update";
import ForgotPassword from "@application/usecases/user/ForgotPassword/ForgotPassword";
import RecoveryAccountFromForgotToken from "@application/usecases/user/ForgotPassword/RecoveryAccountFromForgotToken";
import ConfirmForgotToken from "@application/usecases/user/ForgotPassword/ConfirmForgotToken";
import {
	ensureAuthenticated,
	ensureIsAllowed,
	AuthMiddleware
} from "@adapters/authentication/middlewares/AuthMiddleware";
import UserRepositoryTypeORM from "@infra/database/repositories/UserRepositoryTypeORM";
import AuthenticateUserByToken from "@application/usecases/user/Authenticate/AuthenticateUserByToken";

/**
 * CONFIGURATION
 */
const repository = UserRepositoryTypeORM;
const mailService = new Mailer();
const hashService = new Hasher();
const tokenManager = new JWT(jwt.secretKey);

/**
 * FACTORIES
 */
export function makeCreateUserController(): CreateUserController {
	const createUser = new CreateUser(hashService, repository, new IdGenerator());
	const sendMail = new SendWelcomeMail(mailService);
	return new CreateUserController(createUser, sendMail);
}

export function makeAuthenticateUserController(): AuthenticateUserController {
	const authenticateUser = new AuthenticateUser(
			repository,
			tokenManager,
			hashService
	);
	const authenticateByToken = new AuthenticateUserByToken(repository, tokenManager);
	return new AuthenticateUserController(authenticateUser, authenticateByToken);
}

export function makeFindUserController(): FindController {
	const findById = new FindUserById(repository);
	const list = new ListUsers(repository);
	return new FindUserController(findById, list);
}

export function makeUserDeleteController(): DeleteUserController {
	return new DeleteUserController(new DeleteUser(repository));
}

export function makeUserLinkConfirmationController(): ConfirmRegisterEmailController {
	const useCase = new ConfirmRegisterEmail(repository);
	return new ConfirmRegisterEmailController(useCase);
}

export function makeUserUpdateController(): UpdateUserController {
	return new UpdateUserController(new UpdateUser(repository), new UpdatePassword(repository, hashService));
}

export function makeForgotPasswordController(): ForgotPasswordController {
	return new ForgotPasswordController(
			new ForgotPassword(repository, tokenManager, mailService),
			new RecoveryAccountFromForgotToken(repository, hashService, tokenManager),
			new ConfirmForgotToken(repository, tokenManager)
	);
}

export function makeAuthMiddleware(type: "ensureIsAllowed" | "ensureAuthenticated"): AuthMiddleware {
	const types = {
		ensureAuthenticated: ensureAuthenticated(tokenManager),
		ensureIsAllowed: ensureIsAllowed(tokenManager, repository)
	}
	return types[type];
}