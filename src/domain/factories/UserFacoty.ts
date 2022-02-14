import DomainError from "@domain/errors/DomainError";
import Email from "@domain/entities/shared/valueobjects/Email";
import User from "@domain/entities/user/User";
import { Name, Password, Role } from "@domain/entities/user/valueobjects";

type CreateUserFactory = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    confirmLink?: string;
    forgotToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class UserFactory
{
    public static create(
        {
            id,
            firstName,
            lastName,
            email,
            password,
            role,
            confirmLink = null,
            forgotToken = null,
            createdAt = new Date(),
            updatedAt = new Date()
        }: CreateUserFactory
    ): User | DomainError
    {
        try {
            return new User(
                id,
                new Email(email),
                new Password(password),
                new Name(firstName, lastName),
                new Role(role),
                confirmLink,
                forgotToken,
                createdAt,
                updatedAt
            );
        } catch (error) {
            return error;
        }
    }
}