const express = require("express");
const router = express.Router();
const deleteComment = require("../controllers/deleteComments.controller");

router.delete("/:comment_id", deleteComment, (req, res, next) => {
  errorHandler(err, req, res, next);
});

module.exports = router;
