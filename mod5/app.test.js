const request = require("supertest");
const app = require("./app");

describe("Calculator API Tests", () => {

    test("GET /add should add two numbers", async () => {

        const response = await request(app)
            .get("/add?a=10&b=5");

        expect(response.statusCode).toBe(200);

        expect(response.body.result).toBe(15);
    });

    test("GET /subtract should subtract two numbers", async () => {

        const response = await request(app)
            .get("/subtract?a=10&b=5");

        expect(response.statusCode).toBe(200);

        expect(response.body.result).toBe(5);
    });

    test("GET /multiply should multiply two numbers", async () => {

        const response = await request(app)
            .get("/multiply?a=10&b=5");

        expect(response.statusCode).toBe(200);

        expect(response.body.result).toBe(50);
    });

    test("GET /divide should divide two numbers", async () => {

        const response = await request(app)
            .get("/divide?a=10&b=5");

        expect(response.statusCode).toBe(200);

        expect(response.body.result).toBe(2);
    });

    test("GET /divide should reject division by zero", async () => {

        const response = await request(app)
            .get("/divide?a=10&b=0");

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe("Cannot divide by zero");
    });

});