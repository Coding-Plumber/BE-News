const getUsersController = require('../controllers/getUsers.controllers');
const express = require('express');
const { errorHandler } = require('../errors/errorHandler');
const router = express.Router();


router.get('/', getUsersController, (req, res, next) => {
    errorHandler(err, req, res, next);
});


module.exports = router;

