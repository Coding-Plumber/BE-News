const { errorHandler } = require("../errors/errorHandler");
const postComment = require("../models/postArticles.models");

async function postArticleComments(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({ error: "Invalid" });
  }

  try {
    const userComment = await postComment(article_id, username, body);
    if (userComment) {
      const comment = userComment[0].body;
      res.status(201).send({ comment });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = postArticleComments;
