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

describe("GET /api/articles/:article_id", () => {
  it("responds with the requested article_id object", () => {
    return request(app)
      .get("/api/articles/3")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("articleById");
        expect(response.body.articleById).toEqual({
          article_id: 3,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          votes: 0,
          comment_count: 2,
        });
      });
  });
});

it("responds with the requested comment counts of another article with a larger count", () => {
  return request(app)
    .get("/api/articles/1")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.articleById.comment_count).toEqual(11);
    })
})


  it("should return 404 error if bad pathway", () => {
    return request(app)
      .get("/articles/3/hello")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });



  it("returns with a 404 error and a message of article not found if it doesn't exist", () => {
    return request(app)
      .get("/api/articles/37")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Article not found" });
        expect(response.body).toBeInstanceOf(Object);
      });
  });



  it("Should respond with invalid input when given a string input", () => {
    return request(app)
      .get("/api/articles/'22'")
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Invalid input");
      });
    })
 

