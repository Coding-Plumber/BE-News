const apiArticles = require("express").Router();
const {
  
  getArticlesWithCommentCount,
  getArticleById,
} = require("../models/articles");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return getArticlesWithCommentCount()
    .then((sortedArticlesDesc) => {
      res.status(200).send({ articles: sortedArticlesDesc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    });
});

router.get("/:article_id", (req, res) => {
  const articleId = req.params.article_id;
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
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    });
});

module.exports = router;
