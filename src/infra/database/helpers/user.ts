import { UserDbDTO } from "@application/usecases/user/shared/interfaces";
import User from "@domain/entities/user/User";
import { UserFactory } from "@domain/entities/factories";

export function UserDbConverter(user: UserDbDTO): User {
	return !user ? undefined : UserFactory.create({
		id: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
		password: user.password,
		role: user.role,
		confirmLink: user.confirm_link,
		forgotToken: user.forgot_token,
		createdAt: user.created_at,
		updatedAt: user.updated_at
	}) as User;
}

export const UserDomainToDbConverter = (user: User): UserDbDTO => ({
	id: user.id,
	first_name: user.firstName,
	last_name: user.lastName,
	email: user.emailAddress,
	password: user.password,
	role: user.role,
	confirm_link: user.confirmLink,
	forgot_token: user.forgotToken,
	created_at: user.createdAt,
	updated_at: user.updatedAt
});