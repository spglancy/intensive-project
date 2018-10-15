const Comment = require('../models/comment.js');
const express = require('express');
const commentController = express.Router();
const post = require('../models/post.js');

    commentController.post("/posts/comments", (req, res) => {
       Comment.create(req.body).then(comment => {
           res.redirect(`/posts/${comment.postId}`);
       }).catch((err) => {
           console.log(err.message);
       })
   })

   commentController.delete("/posts/comments/:id", function (req, res) {
       console.log("DELETE comment")
       Comment.findByIdAndRemove(req.params.id).then((comment) => {
           res.redirect(`/posts/${comment.postId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})

module.exports = commentController;
