const app = require('../index');
const bodyParser = require('body-parser');
const articlesRouter = require('../routes/articles')
const topicsRouter = require('../routes/topics');



function handle400Errors(err, req, res, next) {
  
  if (err.status === 400) {
    res.status(400)
    .send({ error : err.message });
  } else {
    next(err);
  }
}

function handle404Errors(err, req, res, next) {
  
  if (err.status === 404) {
  
    res.status(404).send( { error : err.message } );
  } else {
    next(err);
  }
}

function postArticleCommentErrors(err, req, res, next) {
  // Error for inserting a comment to a article_id with a invalid, eg /api/articles/3/comments
  if(err.code === '23503')
  
  res.status(404).send({error: 'Invalid'})
}

function handle500Errors(err, req, res, next) {
  res.status(500)
  .send({error: err.message});
}

function errorHandler(err, req, res, next) {
  next(err);
}


  module.exports = { handle400Errors, handle404Errors, postArticleCommentErrors, handle500Errors, errorHandler};