import { Password, Name, Role } from "./valueobjects";
import Email from "./valueobjects/Email";

export default class User {
    constructor(
        public readonly id: string,
        private _email: Email,
        private passwd: Password,
        private name: Name,
        private roleType: Role,
        public confirmLink?: string,
        public forgotToken?: string,
        public readonly createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}

    public get email(): Email {
        return this._email;
    }

    public get firstName(): string {
        return this.name.firstName;
    }

    public get lastName(): string {
        return this.name.lastName;
    }

    public get fullName(): string {
        return this.name.fullName;
    }

    public updateName(fName: string, lName: string): void {
        this.name = new Name(fName, lName);
    }

    public get password(): string {
        return this.passwd.value;
    }

    public set password(passwd: string) {
        this.passwd = new Password(passwd);
    }

    public get role(): string {
        return this.roleType.value;
    }

    public set role(roleType: string) {
        this.roleType = new Role(roleType);
    }

    public get emailAddress(): string {
        return this._email.address;
    }

    public isAllowedToCreateAnotherUser(): boolean {
        return (
            this.roleType.value === "admin" || this.roleType.value === "boss"
        );
    }

    public isAllowedToFinalizeAppraisal(): boolean {
        return (
            this.roleType.value === "admin" ||
            this.roleType.value === "boss" ||
            this.roleType.value === "intern"
        );
    }

    public isAccountConfirmed(): boolean {
        return this.confirmLink !== null;
    }
}
