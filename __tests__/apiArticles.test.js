const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const jestSorted = require('jest-sorted');

// afterAll(() => {
//   db.end();
// });

beforeEach(() => {
  return seed(data);
});

describe("GET /api/articles", () => {
  it.skip("responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.articles[0]).toHaveProperty("article_id");
        expect(response.body.articles[0]).toHaveProperty("title");
        expect(response.body.articles[0]).toHaveProperty("topic");
        expect(response.body.articles[0]).toHaveProperty("created_at");
        expect(response.body.articles[0]).toHaveProperty("votes");
        expect(response.body.articles[0]).toHaveProperty("article_img_url");
        expect(response.body.articles[0]).toHaveProperty("comment_count");
        expect(response.body.articles[0].comment_count).toEqual(2);
        expect(response.status);
        // expect(response.body[0].created_at).toBeSorted({
        //     descending: (a, b) => new Date(b.created_at) - new Date(a.created_at)
        //   });

    
      });
  });
});

describe("GET wrong pathway /non-existant", () => {
    it.skip("responds with 404 status code", () => {
      return request(app)
        .get("/non-existent")
        .then((response) => {
          expect(response.status).toBe(404);
        });
    });
  });


  describe("If server query ends before receiving", () => {
    it.skip("responds with an error message if the database is not connected", () => {
      db.end();
  
      return request(app)
        .get("/api/topics")
        .then((response) => {
          expect(response.status).toBe(500);
          expect(response.body).toEqual({
            status: "error",
            message: "Internal server error",
          });
        });
    });
  });