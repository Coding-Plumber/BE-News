const express = require("express");
const router = express.Router();
const deleteComment = require("../controllers/deleteComments.controller");

router.delete("/:comment_id", deleteComment)

module.exports = router;
