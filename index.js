const express = require('express');
const app = express();
app.use(express.json());

const apiTopics = require('./routes/topics');
const apiArticles = require('./routes/articles');

app.use('/api/topics', apiTopics);

app.use('/api/articles', apiArticles);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server error');
  });
  



module.exports = app;