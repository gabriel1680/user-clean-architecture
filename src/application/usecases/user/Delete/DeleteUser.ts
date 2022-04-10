import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import { DeleteRepository } from "@application/interfaces/DefaultRepositories";
import { InvalidParametersError } from "@application/errors";
import User from "@domain/entities/user/User";

export default class DeleteUser {
	constructor(private readonly repository: DeleteRepository<User>) { }

	public async execute(id: string): Promise<ApplicationError | DomainError | void> {
		if (!id) return new InvalidParametersError();

		const user = await this.repository.findById(id);
		if (!user) return new UserNotFound();

		await this.repository.doDelete(user);
	}
}