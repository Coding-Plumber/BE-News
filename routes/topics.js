const apiTopics = require("express").Router();
const getTopics = require('../models/topics');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return getTopics()
      .then((topics) => {
        res.status(200).send(topics.rows)
      })
      .catch(() => {
        res.status(500).send({
          status: 'error',
          message: 'Internal server error'
        });
      });
  });






module.exports = router;