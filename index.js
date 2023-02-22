const express = require('express');
const app = express();


const apiTopics = require('./routes/topics');
const apiArticles = require('./routes/articles');
const errorHandler = require('./errors/errorHandler');

app.use('/api/topics', apiTopics);

app.use('/api/articles', apiArticles);

app.use(errorHandler);
    

  



module.exports = app;