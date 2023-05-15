import User from "@domain/entities/user/User";
import { DomainError } from "@domain/errors";

type CreateUserFactory = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    confirmLink?: string;
};

export class UserFactory {
    public static create({
        id,
        firstName,
        lastName,
        email,
        password,
        role,
        confirmLink = null,
    }: CreateUserFactory): User | DomainError {
        try {
            return new User(
                id,
                firstName,
                lastName,
                email,
                password,
                role,
                confirmLink
            );
        } catch (error) {
            return error;
        }
    }
}
