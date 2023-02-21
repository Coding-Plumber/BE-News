const apiArticles = require("express").Router();
const { getArticles, getArticleComments } = require("../models/articles");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Promise.all([
      getArticles(),
      getArticleComments()
    ])
    .then(([articles, comments]) => {
      // takes the data queried and maps over it filtering the articles_id === comment article_id
    //   console.log(comments.rows, 'comment article id')
      const newArticles = articles.rows.map(article => {
        const matchingComments = comments.rows.filter(comment => comment.article_id === article.article_id);
        
        // hanldes the article with the comments

        // matchingComments holds an array of matching article_ids 
        const commentCount = matchingComments.length;
        return {...article, comment_count: commentCount};
      });
  
      // sorts the newArticles by date into desc order
      const sortedArticlesDesc = newArticles.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
  
    //   console.log(sortedArticlesDesc, '<---- sortedArticlesDesc');
    // console.log(sortedArticlesDesc);
      res.status(200).send({ articles: sortedArticlesDesc});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: "Internal server error",
      });
    });
  });


module.exports = router;



