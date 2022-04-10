import UserData from "../../../src/application/usecases/user/Create/interfaces/UserData";

export const invalidUserRequests: UserData[] = [
    {
        firstName: "",
        lastName: "pereira",
        email: "cleber.teste@gmail.com",
        password: "12345678",
        role: "admin"
    },
    {
        firstName: "cleber",
        lastName: "",
        email: "cleber.teste@gmail.com",
        password: "12345678",
        role: "admin"
    },
    {
        firstName: "cleber",
        lastName: "pereira",
        email: "cleber.teste@.com",
        password: "12345678",
        role: "admin"
    },
    {
        firstName: "cleber",
        lastName: "pereira",
        email: "cleber.teste@gmail.com",
        password: "123",
        role: "admin"
    },
    {
        firstName: "cleber",
        lastName: "pereira",
        email: "cleber.teste@gmail.com",
        password: "12345678",
        role: "seila"
    }
];
