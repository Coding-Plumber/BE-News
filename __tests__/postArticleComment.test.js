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

  describe('POST /api/articles/:article_id/comments', () => {
    it('Checks if the user has been created', async () => {

      const commentBody = 'BIG DOG';
      const username = 'lurker';
      const articleId = 3;

      const response = await request(app)
        .post(`/api/articles/${articleId}/comments`)
        .send({ username, body: commentBody });

      expect(response.status).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({ comment: commentBody });

      const { rows } = await db.query(`SELECT * FROM comments WHERE author = '${username}' AND body = '${commentBody}';`);
      
      const createdComment = rows[0];


    expect(createdComment.author).toEqual('lurker');
    expect(createdComment.body).toEqual('BIG DOG');
  });
});


  describe('POST /api/articles/:article_id/comments', () => {
    it('Invalid username input', () => {
        return request(app)
        .post("/api/articles/3/comments")
        .send({username: 'Duncan', body: 'BIG DOG'})
        .then((response) => {
            expect(response.status).toEqual(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toEqual({error: 'Invalid username'});
            
        })
    });
  });

  