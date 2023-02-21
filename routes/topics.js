const apiTopics = require("express").Router();
const getTopics = require('../models/topics');
const errorHandler = require('../errors/errorHandler');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    getTopics()
      .then((topics) => {
        return res.status(200).send(topics.rows);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  });






module.exports = router;