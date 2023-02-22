const express = require('express');
const app = express();


const topicsRouter = require('./routes/topics');
const articlesRouter = require('./routes/articles');
const errorHandler = require('./errors/errorHandler');

app.use('/api/topics', topicsRouter);

app.use('/api/articles', articlesRouter);

app.use(errorHandler);
    

  



module.exports = app;