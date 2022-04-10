import request from "supertest";

import app from "../../../src/main/config/app";
/* @ts-ignore */
import connect from "../database/connection";
import { UserViewDTO } from "../../../src/application/usecases/user/shared/interfaces";
// @ts-ignore
import { invalidUserRequests } from "./CreateUserData";

const requestWithApp = request(app);

beforeAll(async () => {
    await connect();
});

describe("Integration Tests Of UserMongo Creation", function () {

    jest.setTimeout(10000);

    it("should be able to create create user", async () => {
        const newUser = {
            firstName: "cleber",
            lastName: "pereira",
            email: "cleber.teste@gmail.com",
            password: "12345678",
            role: "admin"
        };

        const oRequest = requestWithApp.post("/users").set("Authorization", `bearer `);
        const response = await oRequest.send(newUser);
        
        const user: UserViewDTO = response.body;
        const statusCode: number = response.status;

        expect(statusCode).toBe(201);
        return expect(user).toHaveProperty("id");
    });

    it("should not be able to create user", async () => {

        invalidUserRequests.push({
            firstName: "cleber",
            lastName: "pereira",
            email: "cleber.teste@gmail.com", // Já está caadastrado 👆
            password: "12345678",
            role: "admin"
        });

        const oRequest = requestWithApp.post("/users").set("Authorization", `bearer `);

        await Promise.all(invalidUserRequests.map(async invalidBodyRequest => {
            const response = await oRequest.send(invalidBodyRequest);
            const statusCode: number = response.status;
            return expect(statusCode).toBe(400);
        }));
    });
});
