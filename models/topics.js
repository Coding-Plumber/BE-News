const db = require('../db/connection');

function getTopics() {
    return db.query('SELECT * FROM topics');
}

module.exports = getTopics;

// Responds with:

// an array of topic objects, each of which should have the following properties:
// slug
// description
// As this is the first endpoint you will need to set up your testing suite.

// Errors handled.