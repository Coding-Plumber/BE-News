const db = require("../db/connection");

function getArticles() {
  return db.query("SELECT * FROM articles");
}

function getArticleComments() {
  return db.query("SELECT * FROM comments");
}

module.exports = { getArticles, getArticleComments };
