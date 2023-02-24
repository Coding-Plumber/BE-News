const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/topics", () => {
  it("responds with an array of topic objects", () => {
    return request(app)
      .delete("/api/comments/3")
      .then((response) => {
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
      });
  });
});

it("When trying to delete a comment that does not exist, should respond with 404 and 'comment not found' message", () => {
  return request(app)
    .delete("/api/comments/300")
    .then((response) => {
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ msg: "comment not found" });
    });
});

it("When trying to delete a invalid comment pathway eg a string", () => {
  return request(app)
    .delete("/api/comments/notANumber")
    .then((response) => {
      expect(response.status).toBe(400);
      
    });
});
