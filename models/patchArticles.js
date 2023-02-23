const db = require("../db/connection");

async function updateVoteCount(articleId, newVotes) {
  try {
    const result = await db.query(
      `UPDATE articles
      SET votes = CASE
        WHEN $1 < 0 THEN votes - ABS($1)
        ELSE votes + $1
      END
      WHERE article_id = $2
      RETURNING *`,
      [newVotes, articleId]
    );
    const updatedVotes = result.rows[0];

    if (!updatedVotes) {
      return Promise.reject({
        status: 404,
        message: "Article not found",
      });
    } else {
      return updatedVotes;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = updateVoteCount;
