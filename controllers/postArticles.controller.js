const getUsers = require("../models/getUsers.models");
const { errorHandler } = require("../errors/errorHandler");
const makeComment = require("../models/postArticles.models");

async function postArticleComments(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;
  makeComment(article_id, username, body)
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
