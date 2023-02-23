const express = require("express");
const app = express();

const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");
const {
  errorHandler,
  handle400Errors,
  handle404Errors,
  specificErrorCodes,
  handle500Errors,
} = require("./errors/errorHandler");

app.use(express.json());

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use(handle400Errors);
app.use(handle404Errors);
app.use(specificErrorCodes);
app.use(handle500Errors);
app.use(errorHandler);

module.exports = app;
