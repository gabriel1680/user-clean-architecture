import { Password, Name, Role } from "./valueobjects";
import Email from "./valueobjects/Email";

export default class User {
    private _email: Email;
    private _password: Password;
    private _name: Name;
    private _role: Role;
    private _confirmLink?: string;
    private _forgotToken?: string;

    public readonly createdAt: Date;
    public updatedAt: Date;

    constructor(
        public readonly id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: string,
        confirmationLink: string
    ) {
        this.setName(firstName, lastName);
        this.setEmail(email);
        this.setPassword(password);
        this.setRole(role);
        this._confirmLink = confirmationLink;
        this._forgotToken = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public static hydrate(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: string,
        confirmationLink: string | null | undefined,
        forgotToken: string | null | undefined,
        createdAt: Date,
        updatedAt: Date
    ): User {
        const user = Object.create(User.prototype);
        user.id = id;
        user._name = new Name(firstName, lastName);
        user._email = new Email(email);
        user._password = new Password(password);
        user._role = new Role(role);
        user._confirmLink = confirmationLink;
        user._forgotToken = forgotToken;
        user.createdAt = createdAt;
        user.updatedAt = updatedAt;
        return user;
    }

    public get email(): Email {
        return this._email;
    }

    private setEmail(email: string): void {
        this._email = new Email(email);
    }

    public get name(): Name {
        return this._name;
    }

    private setName(fName: string, lName: string): void {
        this._name = new Name(fName, lName);
    }

    public changeName(fName: string, lName: string): void {
        this.setName(fName, lName);
    }

    public get password(): Password {
        return this._password;
    }

    private setPassword(passwd: string) {
        this._password = new Password(passwd);
    }

    public hashPassword(hash: string): void {
        this.setPassword(hash);
    }

    public get role(): Role {
        return this._role;
    }

    private setRole(role: string) {
        this._role = new Role(role);
    }

    public isAllowedToCreateAnotherUser(): boolean {
        return this._role.value === "admin" || this._role.value === "boss";
    }

    public get confirmLink() {
        return this._confirmLink;
    }

    public hasConfirmedAccount(): boolean {
        return this._confirmLink === null;
    }

    public confirmEmail(): void {
        this._confirmLink = null;
        this.updatedAt = new Date();
    }

    public get forgotToken() {
        return this._forgotToken;
    }

    public requestChangePassword(requestCode: string): void {
        if (!this.hasConfirmedAccount())
            throw new Error(
                "You must confirm your account before request for change password."
            );
        this._forgotToken = requestCode;
        this.updatedAt = new Date();
    }

    public recoverPassword(newPassword: string, confirmPassword: string): void {
        if (!this.hasConfirmedAccount())
            throw new Error(
                "You must confirm your account before change your password."
            );
        if (!this._forgotToken)
            throw new Error(
                "You don't have the token for change your password."
            );
        if (newPassword !== confirmPassword)
            throw new Error("Password mismatch.");
        this._password = new Password(newPassword);
        this._forgotToken = null;
        this.updatedAt = new Date();
    }
}
