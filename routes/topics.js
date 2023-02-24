const getTopicsController = require('../controllers/getTopics.controller');
const express = require('express');
const router = express.Router();

router.get('/', getTopicsController)


module.exports = router;