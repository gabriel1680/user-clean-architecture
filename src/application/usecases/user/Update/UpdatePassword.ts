import { UpdateRepository } from "@application/interfaces/DefaultRepositories";
import UserNotFound from "@application/usecases/user/Find/UserNotFound";
import { HashPasswordService } from "@domain/services";
import { ApplicationError } from "@application/errors";
import { DomainError } from "@domain/errors"
import { InvalidParametersError } from "@application/errors";
import UserPasswordUpdater from "@application/usecases/user/Update/interfaces/UserPasswordUpdater";
import User from "@domain/entities/user/User";

export default class UpdatePassword implements UserPasswordUpdater {
	constructor(
		private readonly repository: UpdateRepository<User>,
		private readonly hashService: HashPasswordService
	) { }

	public async execute(id: string, password: string): Promise<ApplicationError | DomainError | void> {
		if (!id || !password) return new InvalidParametersError();

		const user = await this.repository.findById(id);
		if (!user) return new UserNotFound();

		try {
			user.password = this.hashService.hash(password);
			user.updatedAt = new Date();
		} catch (e) { return e; }

		await this.repository.doUpdate(user);
	}
}