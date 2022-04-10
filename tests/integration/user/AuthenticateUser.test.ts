import request from "supertest";

import app from "../../../src/main/config/app";
/* @ts-ignore */
import connect from "../database/connection";
import { UserViewDTO } from "../../../src/application/usecases/user/shared/interfaces";
// @ts-ignore
import addUserToDatabase from "../database/addUserToDatabase";
import Hasher from "../../../src/infra/services/Hasher";

const requestWithApp = request(app);

beforeAll(async () => {
	await connect();
	await addUserToDatabase({
		id: "as7a8sdas8da",
		first_name: "gabriel",
		last_name: "lopes",
		email: "gabriel.lopes@hotmail.com",
		password: new Hasher().hash("12345678"),
		role: "admin",
		confirm_link: "null",
		forgot_token: "null",
		created_at: new Date(),
		updated_at: new Date()
	});
});

describe("Integration Tests Of UserMongo Authentication", () => {

	jest.setTimeout(5000);

	it("should be able to authenticate user", async () => {
		const bodyRequest = {
			email: "gabriel.lopes@hotmail.com",
			password: "12345678"
		};

		const oRequest = requestWithApp.post("/users/login");
		const response = await oRequest.send(bodyRequest);

		const bodyResponse: { user: UserViewDTO, token: string } = response.body;
		const statusCode: number = response.status;

		expect(statusCode).toBe(200);
		return expect(bodyResponse.user.email).toBe(bodyRequest.email);
	});

	it("should not be able to authenticate user", async () => {
		const invalidRequests = [{
				email: "gabriel.lopes@hotmil.com",
				password: "12345678"
			},
			{
				email: "gabriel.lopes@hotmil.com",
				password: "12345678"
			}];

		const oRequest = requestWithApp.post("/users/login");

		await Promise.all(invalidRequests.map(async invalidBodyRequest => {
			const response = await oRequest.send(invalidBodyRequest);
			const statusCode: number = response.status;
			return expect(statusCode).toBe(400);
		}));
	});
});
