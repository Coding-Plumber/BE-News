const express = require("express");
const router = express.Router();

const { getArticleController, getArticleByIdController, getCommentsByArticleIdController} = require('../controllers/articles.controller');

router.get("/", getArticleController);

router.get("/:article_id", getArticleByIdController);

router.get('/:article_id/comments', getCommentsByArticleIdController);


module.exports = router;
