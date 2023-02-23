const { errorHandler } = require("../errors/errorHandler");
const updateVoteCount = require("../models/patchArticles");

async function patchVotes(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  console.log(inc_votes, "body <----");
  updateVoteCount(article_id, inc_votes)
    .then((votes) => {
      console.log(votes, "<-- votes in then");
    })
    .catch((err) => {
      errorHandler(err, req, res, next);
    });
}

// increase votes for articles by x
module.exports = patchVotes;
