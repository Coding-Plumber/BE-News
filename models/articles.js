const db = require("../db/connection");

async function getArticlesWithCommentCount() {
  try {
  const result = await db.query(
    `
    SELECT articles.*, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
  `
  );
  return result.rows.map((article) => ({
    ...article,

    created_at: new Date(article.created_at),
  }))
} catch (error) {
  throw error;
}
}


async function getArticleById(id) {
  try {
    const result = await db.query(
      `SELECT articles.* 
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id`,
      [id]
    );

    const article = result.rows[0];
    return article;
  } catch (error) {
    throw error;
  }
}

async function getCommentsByArticleId(id) {
  try {
    const result = await db.query(
      `SELECT comments.*                                                      
      FROM comments                                                                          
      WHERE article_id = $1 
      ORDER BY created_at DESC`,
      [id]
    );
    const comments = result.rows;
    return comments;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getArticlesWithCommentCount,
  getArticleById,
  getCommentsByArticleId,
};
