const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const jestSorted = require("jest-sorted");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("GET /api/users", () => {
  it("Returns an array of objects with each object containing a username, name and avatar_url ", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body.users).toBeInstanceOf(Array);
    expect(response.body.users).toBeInstanceOf(Object);
    expect(response.body.users[0]).toHaveProperty("username");
    expect(response.body.users[0]).toHaveProperty("name");
    expect(response.body.users[0]).toHaveProperty("avatar_url");
  });
});


