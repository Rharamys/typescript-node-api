let mockNodeFetch = jest.fn()
jest.mock("node-fetch", () => mockNodeFetch)

import request from "supertest";

import app from "../src/index"

describe("Endpoint tests", () => {
    afterAll(async () => {
        app.close();
    });
    test("Api-call route", async () => {
        
        let returnBody = { count: 35286, name: "silvia", age: 53}
        const response = Promise.resolve({
            ok: true,
            status: 200,
            json: () => {return returnBody}
        })
        mockNodeFetch.mockImplementation(() => response)

        const res = await request(app)
            .get("/api-call")
            .query({ name: 'silvia' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            "count": 35286,
            "name": "silvia",
            "age": 53
        });
    });
});