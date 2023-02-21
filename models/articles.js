const db = require("../db/connection");



async function getArticlesWithCommentCount() {
  const result = await db
    .query(
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
  }));
}

async function getArticleById(id) {
  try {
    const result = await db.query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
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

module.exports = {
  
  getArticlesWithCommentCount,
  getArticleById,
};
