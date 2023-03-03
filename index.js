const app = require('./index.js');
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

const express = require("express");
const app = express();

const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const {
  
  handle400Errors,
  psqlErrors,
  handle500Errors,
  errorHandler,
} = require("./errors/errorHandler");

app.use(express.json());

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.use(handle400Errors);
app.use(psqlErrors);
app.use(handle500Errors);
app.use(errorHandler);



module.exports = app;
