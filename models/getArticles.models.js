const db = require("../db/connection");

async function getArticlesModels(topic, sortBy, order) {
  try {
    const validColumns = [
      "article_id",
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes",
      "article_img_url",
      "comment_count",
    ];
// if given a sortBy input and it isn't one of the properties throw a error
    if (sortBy && !validColumns.includes(sortBy)) {
      throw Error('Invalid column name');
    }

    let requestPSQL = `
      SELECT articles.*, COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
    `;

    // Gets all articles with comment_count from Article and joins comments on article_id
    const values = []; // stores the topic values

    // if topics exists adds WHERE clause to the above SQL statement before running
    if (topic) {
      requestPSQL += "WHERE topic = $1 ";
      values.push(topic);
    }

    // sorts by input or if no input by DATE and orders by input or defaults to DESC (newest)
    requestPSQL += `GROUP BY articles.article_id 
    ORDER BY ${sortBy || "created_at"} ${order || "DESC"}     
    `;

    const result = await db.query(requestPSQL, values);
    return result.rows;


  } catch (error) {
    throw error;
  }
}



async function getArticleById(id) {
  try {
    const result = await db.query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id`,
      [id]
    );

    const article = result.rows[0];
    return article;
  } catch (error) {
    throw error;
  }
}

async function getCommentsByArticleId(id) {
  try {
    const result = await db.query(
      `SELECT comments.*                                                      
      FROM comments                                                                          
      WHERE article_id = $1 
      ORDER BY created_at DESC`,
      [id]
    );
    const comments = result.rows;
    return comments;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getArticlesModels,
  getArticleById,
  getCommentsByArticleId,
};
