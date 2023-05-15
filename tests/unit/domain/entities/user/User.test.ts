import User from "@domain/entities/user/User";
import {
    Email,
    Name,
    Password,
    Role,
} from "@domain/entities/user/valueobjects";

it("should be able to retrieve user object", () => {
    const now = new Date();
    const user = User.hydrate(
        "id",
        "gabriel",
        "lopes",
        "gaberiel.lopes@gmail.com",
        "123456789",
        "admin",
        null,
        null,
        new Date(),
        new Date()
    );
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBeInstanceOf(Email);
    expect(user.name).toBeInstanceOf(Name);
    expect(user.password).toBeInstanceOf(Password);
    expect(user.role).toBeInstanceOf(Role);
    expect(user.createdAt.toISOString()).toBe(now.toISOString());
    expect(user.updatedAt.toISOString()).toBe(now.toISOString());
});

it("should change user name", () => {
    const user = makeDummyUser();
    user.changeName("jailson", "mendes");
    expect(user.name.fullName).toBe("jailson mendes");
});

it("should confirm email", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    expect(user.confirmLink).toBeNull();
});

it("should tell when user already has confirmed his email", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    expect(user.hasConfirmedAccount()).toBeTruthy();
});

it("should not be able to recover password when user have not confirmed his account", () => {
    const user = makeDummyUser();
    const newPassword = "my-new-and-secret-password";
    expect(() => {
        user.recoverPassword(newPassword, newPassword);
    }).toThrowError();
});

it("should not be able to recover password when user have confirmed his account but haven't requested to change it", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    const newPassword = "my-new-and-secret-password";
    expect(() => {
        user.recoverPassword(newPassword, newPassword);
    }).toThrowError();
});

it("should not be able to recover password passwords mismatch", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    const newPassword = "my-new-and-secret-password";
    expect(() => {
        user.recoverPassword(newPassword, newPassword);
    }).toThrowError();
});

it("should be able to recover password", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    user.requestChangePassword("1234");
    const newPassword = "my-new-and-secret-password";
    user.recoverPassword(newPassword, newPassword);
    expect(user.password.value).toBe(newPassword);
    expect(user.forgotToken).toBeNull();
});

it("should not be able to request to change password when user haven't confirmed his email", () => {
    const user = makeDummyUser();
    expect(() => {
        user.requestChangePassword("1234");
    }).toThrowError();
});

it("should be able to request to change password", () => {
    const user = makeDummyUser();
    user.confirmEmail();
    user.requestChangePassword("1234");
    expect(user.forgotToken).toBe("1234");
});

function makeDummyUser(): User {
    return new User(
        "id",
        "gabriel",
        "lopes",
        "gabriel.lopes@gmail.com",
        "123456789",
        "admin",
        "https://test.com"
    );
}
