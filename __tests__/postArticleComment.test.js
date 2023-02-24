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
  it("Checks the body for the returned comment", async () => {
    const commentBody = "BIG DOG";
    const username = "lurker";
    const articleId = 3;

    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username, body: commentBody });

    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toEqual({ comment: "BIG DOG" });
  });
});

it("returns 404 if the article_id is not a number", async () => {
  const commentBody = "BIG DOG";
  const username = "lurker";
  const response = await request(app)
    .post("/api/articles/notANumber/comment")
    .send({ username, body: commentBody });
  expect(response.status).toEqual(404);
});

it("Invalid username input, expect 400 code", () => {
  return request(app)
    .post("/api/articles/3/comments")
    .send({ username: "Duncan", body: "BIG DOG" })
    .then((response) => {
      expect(response.status).toEqual(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ error: "Invalid" });
    });
});

it("Missing field eg no body returns 400 code", () => {
  return request(app)
    .post("/api/articles/3/comments")
    .send({ username: "Duncan" })
    .then((response) => {
      expect(response.status).toEqual(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ error: "Invalid" });
    });
});

it("Invalid pathway, expect code 404", async () => {
  const commentBody = "BIG DOG";
  const username = "lurker";
  const articleId = 3;

  const response = await request(app)
    .post(`/api/articles/${articleId}/commentZ`)
    .send({ username, body: commentBody });

  expect(response.status).toEqual(404);
  expect(response.body).toBeInstanceOf(Object);
});
