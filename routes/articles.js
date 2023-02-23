const express = require("express");
const router = express.Router();

const {
  getArticleController,
  getArticleByIdController,
  getCommentsByArticleIdController,
  
} = require("../controllers/getArticles.controller");
const postArticleComments = require("../controllers/postArticles.controller");
const patchVotes = require('../controllers/patchArticles.controller');

router.get("/", getArticleController, (err, req, res, next) => {
  errorHandler(err, req, res, next);
});

router.get("/:article_id", getArticleByIdController, (err, req, res, next) => {
  errorHandler(err, req, res, next);
});

router.get(
  "/:article_id/comments",
  getCommentsByArticleIdController,
  (err, req, res, next) => {
    errorHandler(err, req, res, next);
  }
);



router.post("/:article_id/comments", (req, res, next) =>
  postArticleComments(req, res, next)
);

router.patch("/:article_id", (req, res, next) => {
  patchVotes(req, res, next);

})

module.exports = router;
