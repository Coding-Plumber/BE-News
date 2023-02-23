const db = require("../db/connection");

async function updateVoteCount(articleId, newVotes) {
    console.log('Within updatedVoteCount');
  try {
    const result = await db.query(
        `UPDATE comments
         SET votes = votes + $1
         WHERE article_id = $2
         RETURNING *`,
        [newVotes, articleId]
      );
    const updatedVotes = result.rows[0];
        console.log(updatedVotes, '<-- updatedVotes within updateVC');
    if (!updatedVotes) {
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    } else {
      return updatedVotes;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = updateVoteCount;
