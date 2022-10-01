import request from "supertest";
import app from "../../../src/api/app";

describe("GET /users", () => {
    it("should respond with a list of user objects", async () => {
        let endpoint = "/users";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
    });
});
