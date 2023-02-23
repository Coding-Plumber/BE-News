const db = require("../db/connection");

async function getUsers(username) {
  try {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    const rows = result.rows;
    const user = rows[0];

    if (!user) {
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getUsers;
