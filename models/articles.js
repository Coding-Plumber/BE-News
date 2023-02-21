const db = require("../db/connection");

function getArticles() {
  return db.query("SELECT * FROM articles");
}

function getArticleComments() {
  return db.query("SELECT * FROM comments");
}

function getArticlesWithCommentCount() {
  return db
    .query(
      `
    SELECT articles.*, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
  `
    )
    .then((result) => {
      return result.rows.map((article) => ({
        ...article,
        created_at: new Date(article.created_at),
      }));
    });
}

function getArticleById(id) {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
     FROM articles
     LEFT JOIN comments ON articles.article_id = comments.article_id
     WHERE articles.article_id = $1
     GROUP BY articles.article_id`,
      [id]
    )
    .then((result) => {
      const article = result.rows[0];

      return article;
    });
}

module.exports = {
  getArticles,
  getArticleComments,
  getArticlesWithCommentCount,
  getArticleById,
};
