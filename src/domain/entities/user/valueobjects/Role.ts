import InvalidRoleError from "../errors/InvalidRoleError";

enum Roles {
    admin = "admin",
    boss = "boss",
    intern = "intern",
    employee = "employee",
}

export default class Role
{
    public readonly value: string;

    constructor(role: string) {
        if (!Roles[role]) throw new InvalidRoleError();
        this.value = role;
    }
}