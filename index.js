const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const topicsRouter = require('./routes/topics');
const articlesRouter = require('./routes/articles');
const { errorHandler, handle400Errors, handle404Errors, postArticleCommentErrors, handle500Errors } = require('./errors/errorHandler');

app.use(bodyParser.json());





app.use('/api/topics', topicsRouter);

app.use('/api/articles', articlesRouter);

app.use(handle400Errors);
app.use(handle404Errors);
app.use(postArticleCommentErrors);
app.use(handle500Errors);
app.use(errorHandler);



    

  



module.exports = app;