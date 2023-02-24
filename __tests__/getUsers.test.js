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
    expect(response.body.msg).toBeInstanceOf(Array);
    expect(response.body.msg).toBeInstanceOf(Object);
    expect(response.body.msg[0]).toHaveProperty("username");
    expect(response.body.msg[0]).toHaveProperty("name");
    expect(response.body.msg[0]).toHaveProperty("avatar_url");
  });
});

it("Returns a 404 error when requesting from the incorrect pathway", async () => {
  const response = await request(app).get("/api/usersS");
  expect(response.status).toEqual(404);
});
