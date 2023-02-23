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

describe("PATCH/api/articles/:article_id", () => {
  it("update vote count to article_id pathway", async () => {
    const articleId = 3;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.votes).toEqual(27);
  });
});

describe("PATCH/api/articles/:article_id", () => {
  it("update vote count to article_id pathway that isn't already at 0", async () => {
    const articleId = 1;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.votes).toEqual(127);
  });
});

describe("PATCH/api/articles/:article_id", () => {
  it("article_id with 0 points given negative number", async () => {
    const articleId = 2;
    const newVote = -27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.votes).toEqual(-27);
  });
});

describe("PATCH/api/articles/:article_id", () => {
  it("invalid article_id", async () => {
    const articleId = 300;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual("Article not found");
  });
});

describe("PATCH/api/articles/:article_id", () => {
  it("returns an error if the article_id is not a number", async () => {
    const newVote = 5;
    const response = await request(app)
      .patch("/api/articles/notANumber")
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("Bad request");
  });
});
