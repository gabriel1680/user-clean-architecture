import { UserViewDTO } from "../interfaces";
import User from "@domain/entities/user/User";

export default class UserToView implements UserViewDTO
{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: User) {
        this.id = user.id,
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.email = user.emailAddress,
        this.role = user.role,
        this.createdAt = user.createdAt,
        this.updatedAt = user.updatedAt
    }
}
