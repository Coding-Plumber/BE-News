const express = require('express');
const app = express();
app.use(express.json());

const apiTopics = require('./routes/topics');


app.use('/api/topics', apiTopics);


module.exports = app;