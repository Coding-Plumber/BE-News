const getTopicsController = require('../controllers/topics.controller');
const express = require('express');
const router = express.Router();

router.get('/', getTopicsController)


module.exports = router;