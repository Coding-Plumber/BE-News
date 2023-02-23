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

describe("POST /api/articles/:article_id/comments", () => {
  it("Checks the comment body for the posted comment", async () => {
    const commentBody = "BIG DOG";
    const username = "lurker";
    const articleId = 3;

    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username, body: commentBody });

    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({ comment: commentBody });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("Invalid username input", () => {
    return request(app)
      .post("/api/articles/3/comments")
      .send({ username: "Duncan", body: "BIG DOG" })
      .then((response) => {
        expect(response.status).toEqual(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toEqual({ error: "Invalid" });
      });
  });
});


describe("POST wrong pathway /non-existant", () => {
    it("POST /api/articles/:article_id/commentZ", () => {
      return request(app)
        .post("/articles/3/commentZ")
        .send({ username: "lurker", body: "BIG DOG" })
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toEqual({});
        });
    });
  });