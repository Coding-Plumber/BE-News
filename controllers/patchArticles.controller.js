const { errorHandler } = require("../errors/errorHandler");
const updateVoteCount = require("../models/patchArticles");

async function patchVotes(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateVoteCount(article_id, inc_votes)
    .then((votes) => {
      res.status(200).send({ msg: votes });
    })
    .catch((err) => {
      errorHandler(err, req, res, next);
    });
}

module.exports = patchVotes;
