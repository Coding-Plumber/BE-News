const apiArticles = require("express").Router();
const { getArticles, getArticleComments } = require("../models/articles");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Promise.all([getArticles(), getArticleComments()])
    .then(([articles, comments]) => {
      // takes the data queried and maps over it filtering the articles_id === comment article_id
      
      const newArticles = articles.rows.map((article) => {
        const matchingComments = comments.rows.filter(
          (comment) => comment.article_id === article.article_id
        );

        

        // matchingComments holds an array of matching article_ids
        const commentCount = matchingComments.length;
        return { ...article, comment_count: commentCount };
      });

      // sorts the newArticles by date into desc order
      const sortedArticlesDesc = newArticles.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });

      
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
  getArticles()
    .then((articles) => {
      const matchingArticles = articles.rows.filter(
        (article) => article.article_id === Number(articleId)
      );

      if (matchingArticles.length === 0) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        res.status(200).send({ article: matchingArticles });
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
