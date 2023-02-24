const getUsers = require('../models/getUsers.models');

async function getUsersController(req, res, next) {
    const users = await getUsers();
    res.status(200).send({ msg: users});
}

module.exports = getUsersController;