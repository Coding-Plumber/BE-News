const getTopics = require('../models/topics');



async function getTopicsController(req, res) {
    getTopics()
      .then((topics) => {
        return res.status(200).send(topics.rows);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
};


module.exports = getTopicsController;