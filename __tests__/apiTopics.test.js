const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

// afterAll(() => {
//   db.end();
// });

beforeEach(() => {
  return seed(data);
});

describe("GET /api/topics", () => {
  it("responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty("slug");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.status);
      });
  });
});

describe("GET /api/topics", () => {
  it("should return an error when connecting to the wrong path", () => {
    return request(app)
      .get("/api/topicss")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});

describe("GET /api/topics", () => {
  it("responds with an error message if the database is not connected", () => {
    db.end();

    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
          status: "error",
          message: "Internal server error",
        });
      });
  });
});
