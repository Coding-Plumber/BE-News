const express = require("express");
const router = express.Router();

const { getArticleController, getArticleByIdController} = require('../controllers/articles.controller');

router.get("/", getArticleController);

router.get("/:article_id", getArticleByIdController);

module.exports = router;
