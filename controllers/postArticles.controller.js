const { errorHandler } = require("../errors/errorHandler");
const postComment = require("../models/postArticles.models");

async function postArticleComments(req, res, next) {
  if (!req.body.username || !req.body.body) {
    res.status(400).send({ error: "Invalid" });
  }
  const { article_id } = req.params;
  const { username, body } = req.body;
  postComment(article_id, username, body)
    .then((userComment) => {
      if (userComment) {
        const comment = userComment[0].body;
        res.status(201).send({ comment });
      }
    })
    .catch((err) => {
      errorHandler(err, req, res, next);
    });
}

module.exports = postArticleComments;
