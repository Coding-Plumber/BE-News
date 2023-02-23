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

describe.only("PATCH/api/articles/:article_id", () => {
  it("", async () => {
    const articleId = 3;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(201);
  });
});
