const { getArticleById,getArticlesWithCommentCount } = require('../models/articles');



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
    return res.status(400).send({ message: "Invalid input" });
  }
  getArticleById(articleId)
    .then((article) => {
      if (!article) {
        res.status(404).send({
          message: "Article not found",
        });
      } else {
        const requestedArticle = {...article, 
        comment_count: Number(article.comment_count),
      }
        res.status(200).send({ requestedArticle });
      }
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};



module.exports = { getArticleController, getArticleByIdController}