const app = require("../index");
const bodyParser = require("body-parser");
const articlesRouter = require("../routes/articles");
const topicsRouter = require("../routes/topics");

function handle400Errors(err, req, res, next) {
  if (err.status === 400) {
    res.status(400).send({ error: err.message });
  } else if (err.status === 404) {
    res.status(404).send({ error: err.message });
  } else {
    next(err);
  }
}

function psqlErrors(err, req, res, next) {
  if (err.code === "23503") {
    res.status(400).json({ error: "Invalid" });
  } else if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid" });
  } else if (err.message === 'Invalid column name') {
    res.status(400).send({message: "Invalid column name"});
  } else {
    next(err);
  }
}

function handle500Errors(err, req, res, next) {
  res.status(500).send({ error: err.message });
}

function errorHandler(err, req, res, next) {
  // console.log(err, '<--- ERROR INSIDE ERROR HANDLER');
  next(err);
}

module.exports = {
  handle400Errors,
  psqlErrors,
  handle500Errors,
  errorHandler,
};
