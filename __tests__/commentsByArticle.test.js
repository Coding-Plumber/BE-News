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

describe("GET /api/articles/:article_id/comments", () => {
  it("responds with an array of sorted comments for given article", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.articleComments).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty("articleComments");
        expect(response.body.articleComments).toEqual([
          {
            article_id: 3,
            author: "icellusedkars",
            body: "Ambidextrous marsupial",
            comment_id: 11,
            created_at: "2020-09-19T23:10:00.000Z",
            votes: 0,
          },
          {
            article_id: 3,
            author: "icellusedkars",
            body: "git push origin master",
            comment_id: 10,
            created_at: "2020-06-20T07:24:00.000Z",
            votes: 0,
          },
        ]);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("Attempt to get comments from an article with no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBeInstanceOf(Array);
        expect(response.body.message).toEqual([]);
      });
  });
});

describe("GET wrong pathway /non-existant", () => {
  it("GET /api/articles/:article_id/commentZ", () => {
    return request(app)
      .get("/articles/3/commentZ")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});

describe("GET request that isn;t a article_id Number", () => {
  it("GET /api/articles/'74'/comments", () => {
    return request(app)
      .get("/api/articles/'74'/comments")
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid input" });
        expect(response.body).toBeInstanceOf(Object);
      });
  });
});

describe("GET non existant article_id", () => {
  it("GET /api/articles/740/comments", () => {
    return request(app)
      .get("/api/articles/740/comments")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual([]);
        expect(response.body.message).toBeInstanceOf(Array);
        expect(response.body).toBeInstanceOf(Object);
      });
  });
});
