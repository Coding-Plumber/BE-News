const apiArticles = require("express").Router();
const {
  
  getArticlesWithCommentCount,
  getArticleById,
} = require("../models/articles");

const express = require("express");
const router = express.Router();
const errorHandler = require('../errors/errorHandler');

router.get("/", (req, res) => {
  getArticlesWithCommentCount()
    .then((sortedArticlesDesc) => {
      res.status(200).send({ articles: sortedArticlesDesc });
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
});

router.get("/:article_id", (req, res) => {
  const articleId = req.params.article_id;
  if (isNaN(articleId)) {
    return res.status(400).send({ message: "Invalid input" });
  }
  getArticleById(articleId)
    .then((article) => {
      if (!article) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
});



module.exports = router;
