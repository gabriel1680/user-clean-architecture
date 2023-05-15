import { UserDbDTO } from "@application/usecases/user/shared/interfaces";
import User from "@domain/model/user/User";

export function UserDbConverter(user: UserDbDTO): User {
    return User.hydrate(
        user.id,
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.role,
        user.confirm_link,
        user.forgot_token,
        user.created_at,
        user.updated_at
    );
}

export const UserDomainToDbConverter = (user: User): UserDbDTO => ({
    id: user.id,
    first_name: user.name.firstName,
    last_name: user.name.lastName,
    email: user.email.address,
    password: user.password.value,
    role: user.role.value,
    confirm_link: user.confirmLink,
    forgot_token: user.forgotToken,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
});
