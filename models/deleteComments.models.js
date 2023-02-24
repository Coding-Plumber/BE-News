const db = require("../db/connection");

async function deleteCommentById(commentId) {
  const result = await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1`,
    [commentId]
  );
//   if (result.rowCount > 0) {
//     console.log(`Comment with ID ${commentId} was deleted`);
//   } else {
//     console.log(`Comment with ID ${commentId} was not found`);
//   }

  return result.rowCount;
}

module.exports = deleteCommentById;
