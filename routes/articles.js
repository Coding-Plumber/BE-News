const express = require("express");
const router = express.Router();

const {
  getArticleController,
  getArticleByIdController,
  getCommentsByArticleIdController,
} = require("../controllers/getArticles.controller");
const postArticleComments = require("../controllers/postArticles.controller");
const patchVotes = require("../controllers/patchArticles.controller");
const { errorHandler } = require("../errors/errorHandler");

router.get("/", getArticleController, (req, res, next) => {
  
  errorHandler(err, req, res, next);
});

router.get("/:article_id", getArticleByIdController, (req, res, next) => {
  errorHandler(err, req, res, next);
});

router.get(
  "/:article_id/comments",
  getCommentsByArticleIdController,
  (req, res, next) => {
    errorHandler(err, req, res, next);
  }
);

router.post("/:article_id/comments", postArticleComments, (req, res, next) => {
  
  errorHandler(err, req, res, next);
});

router.patch("/:article_id", patchVotes, (req, res, next) => {
  
  errorHandler(err, req, res, next);
});

module.exports = router;
