import User from "./User";
import DomainError from "../shared/DomainError";

type CreateUserFactory = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    confirmLink?: string;
};

export default class UserFactory {
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
