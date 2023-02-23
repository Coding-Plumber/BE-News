const db = require("../db/connection");

async function makeComment(articleId, username, body) {
  try {
    const result = await db.query(
      `INSERT INTO comments (article_id, author, body) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [articleId, username, body]
    );
    const comment = result.rows;

    if (!comment) {
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    } else {
      return comment;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = makeComment;
