import request from "supertest";

import app from "../../src/main/config/app";

const requestWithApp = request(app);

describe("Integration Tests Of App Default Routes", () => {
    it("should be able return 404 not found status", async () => {
        const response = await requestWithApp.get("/dont_know");
        const statusCode: number = response.status;
        return expect(statusCode).toBe(404);
    });
});