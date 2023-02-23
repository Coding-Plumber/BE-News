const {
  getArticleById,
  getArticlesWithCommentCount,
  getCommentsByArticleId,
} = require("../models/getArticles.models");
const errorHandler = require('../errors/errorHandler');

async function getArticleController(req, res) {
  getArticlesWithCommentCount()
    .then((sortedArticlesDesc) => {
      res.status(200).send({ articles: sortedArticlesDesc });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

async function getArticleByIdController(req, res) {
  const articleId = req.params.article_id;
  if (isNaN(articleId)) {
    return res.status(400).send({ message: "Invalid input, please enter Int" });
  }
  getArticleById(articleId)
    .then((article) => {
      if (!article) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        res.status(200).send({articleById: article });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

async function getCommentsByArticleIdController(req, res) {
  const { article_id } = req.params;
  if (isNaN(article_id)) {
    return res.status(400).send({ message: "Invalid input" });
  }
  getCommentsByArticleId(article_id)
    .then((comments) => {
      if (!comments) {
        res.status(404).send({ message: "Comments not found" });
      } else if (comments.length === 0) {
        res.status(404).send({
          message: "Comments not found",
        });
      } else {
        res.status(200).send({ articleComments: comments });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}



module.exports = {
  getArticleController,
  getArticleByIdController,
  getCommentsByArticleIdController,
};
