import { UserViewDTO } from "@application/usecases/user/shared/interfaces";
import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import UserToView from "@application/usecases/user/shared/helpers/UserToView";
import { UpdateRepository } from "@application/interfaces/DefaultRepositories";
import { InvalidParametersError } from "@application/errors";
import UserUpdater from "@application/usecases/user/Update/interfaces/UserUpdater";
import User from "@domain/entities/user/User";

export type UpdateUserPayload = {
	firstName: string,
	lastName: string,
	role: string
};

export default class UpdateUser implements UserUpdater {
	constructor(private readonly repository: UpdateRepository<User>) { }

	public async execute(id: string, {
		firstName,
		lastName,
		role
	}: UpdateUserPayload): Promise<ApplicationError | DomainError | UserViewDTO> {
		if (!id || !firstName || !lastName || !role) return new InvalidParametersError();

		const user = await this.repository.findById(id);
		if (!user) return new UserNotFound();

		try {
			user.updateName(firstName, lastName);
			user.role = role;
			user.updatedAt = new Date();
		} catch (e) { return e }

		await this.repository.doUpdate(user);

		return new UserToView(user);
	}
}