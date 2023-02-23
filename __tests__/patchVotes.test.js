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
    expect(response.body.msg.votes).toEqual(27);
  });
});


  it("update vote count to article_id pathway that isn't already at 0", async () => {
    const articleId = 1;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg.votes).toEqual(127);
  });



  it("article_id with 0 votes, returns negative number -27", async () => {
    const articleId = 2;
    const newVote = -27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg.votes).toEqual(-27);
  });



  it("invalid article_id returns code 200 but empty results []", async () => {
    const articleId = 300;
    const newVote = 27;

    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual([]);
  });



  it("returns an error if the article_id is not a number returns 400 code", async () => {
    const newVote = 5;
    const response = await request(app)
      .patch("/api/articles/notANumber")
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid");
  });

  it("returns 400 if newVote is NaN", async () => {
    const newVote = '5';
    const response = await request(app)
      .patch("/api/articles/notANumber")
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid");
  });

