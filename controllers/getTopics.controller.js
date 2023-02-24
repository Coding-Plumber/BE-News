const getTopics = require('../models/getTopics.models');



async function getTopicsController(req, res, next) {
  try {
  const topics = await getTopics();
  return res.status(200).send(topics.rows);
  } catch (error) {
  next(error);
  }
  };
  
  


module.exports = getTopicsController;