const express = require("express");
const router = express.Router();

const {
  getArticleController,
  getArticleByIdController,
  getCommentsByArticleIdController,
} = require("../controllers/getArticles.controller");
const postArticleComments = require("../controllers/postArticles.controller");
const patchVotes = require("../controllers/patchArticles.controller");


router.get("/", getArticleController)

router.get("/:article_id", getArticleByIdController);

router.get("/:article_id/comments", getCommentsByArticleIdController);

router.post("/:article_id/comments", postArticleComments);

router.patch("/:article_id", patchVotes)

module.exports = router;
