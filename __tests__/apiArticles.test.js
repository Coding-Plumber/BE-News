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

describe("GET /api/articles", () => {
  it("responds with an array of article objects when given no parameters", () => {
    return request(app)
      .get("/api/articles")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

        const expectedProperties = [
          "article_id",
          "title",
          "topic",
          "created_at",
          "votes",
          "article_img_url",
          "comment_count",
        ];
        const articles = response.body.articles;

        response.body.articles.forEach((article) => {
          expect(article).toBeInstanceOf(Object);
          expectedProperties.forEach((property) => {
            expect(article).toHaveProperty(property);
          });
          expect(articles).toBeSorted({
            descending: (a, b) =>
              new Date(b.created_at) - new Date(a.created_at),
          });
        });
      });
  });
});

const expectedProperties = [
  "article_id",
  "title",
  "topic",
  "author",
  "body",
  "created_at",
  "votes",
  "article_img_url",
  "comment_count",
];

it("responds with a cats array article object", () => {
  return request(app)
    .get("/api/articles")
    .query({ topic: "cats", sortBy: "created_at", order: "DESC" })
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.articles).toBeInstanceOf(Array);

      response.body.articles.forEach((article) => {
        expectedProperties.forEach((property) => {
          expect(article).toHaveProperty(property);
        });
      });
    });
});

it("should respond with multiple object array of topics 'mitch' sorted by comment_count DESC", () => {
  return request(app)
    .get("/api/articles")
    .query({ topic: "mitch", sortBy: "comment_count", order: "DESC" })
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.articles).toBeInstanceOf(Array);
      response.body.articles.forEach((article) => {
        expectedProperties.forEach((property) => {
          expect(article).toHaveProperty(property);
        });
      });

      expect(response.body.articles).toBeSorted({
        descending: true,
        key: 'comment_count'
      });
    });
});

it("should respond with multiple object array sorted by comment_count DESC ", () => {
  return request(app)
    .get("/api/articles")
    .query({ topic: null, sortBy: "comment_count", order: "DESC" })
    .then((response) => {
      expect(response.body.articles).toBeSorted({
        descending: true,
        key: 'comment_count'
      });
    });
});

it("should respond with multiple object array sorted by a default of created_at, by DESC because no inputs given ", () => {
  return request(app)
    .get("/api/articles")
    .query({ topic: null, sortBy: null , order: null })
    .then((response) => {
      expect(response.body.articles).toBeSorted({
        descending: true,
        key: 'created_at'
      });
    });
});

it("should return a error when given a non-valid sortBy property", () => {
  return request(app)
    .get("/api/articles")
    .query({ topic: null, sortBy: 'hello' , order: null })
    .then((response) => {
      expect(response.status).toBe(400)
      expect(response.body.message).toEqual("Invalid column name");
      });
    });







