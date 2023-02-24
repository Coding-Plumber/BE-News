const {
  getArticleById,
  getArticlesModels,
  getCommentsByArticleId,
} = require("../models/getArticles.models");
const { errorHandler } = require("../errors/errorHandler");

async function getArticleController(req, res, next) {
  try {
    const { topic, sortBy, order } = req.query;
    // queries PSQL databse with await async request
    const sortedArticlesDesc = await getArticlesModels(topic, sortBy, order);
    
    // returns results and maps over them converting comment_count to Number;
    const returnedArticles = sortedArticlesDesc.map((article) => {
      return {
        ...article,
        comment_count: Number(article.comment_count),
      };
    });

    res.status(200).send({ articles: returnedArticles });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getArticleByIdController(req, res, next) {
  const articleId = req.params.article_id;
  if (isNaN(articleId)) {
    return res.status(400).send({ message: "Invalid input" });
  }
  getArticleById(articleId)
    .then((returnedArticle) => {
      if (!returnedArticle || returnedArticle.length === 0) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        const newObject = {
          ...returnedArticle,
          comment_count: Number(returnedArticle.comment_count),
        };

        res.status(200).send({ articleById: newObject });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res, next);
    });
}

async function getCommentsByArticleIdController(req, res, next) {
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
          message: [],
        });
      } else {
        res.status(200).send({ articleComments: comments });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res, next);
    });
}

module.exports = {
  getArticleController,
  getArticleByIdController,
  getCommentsByArticleIdController,
};
