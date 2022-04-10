import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { InvalidParametersError } from "@application/errors";
import { ApplicationError } from "@application/errors";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { FindByIdRepository } from "@application/interfaces/DefaultRepositories";
import { UserFinder } from "@application/usecases/user/Find/interfaces/UserFinder";
import User from "@domain/entities/user/User";

export default class FindUserById implements UserFinder {
	constructor(private userRepository: FindByIdRepository<User>) { }

	public async execute(id): Promise<ApplicationError | UserViewDTO> {
		if (!id) return new InvalidParametersError();

		const user = await this.userRepository.findById(id);
		if (!user) return new UserNotFound();

		return new UserToView(user);
	}
}