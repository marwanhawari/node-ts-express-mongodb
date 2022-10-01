import request from "supertest";
import app from "../../src/api/app";

describe("GET /", () => {
    it("should respond with a message and 200", async () => {
        let endpoint = "/";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Please use the /users endpoint.");
    });
});
