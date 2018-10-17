const Comment = require('../models/comment.js');
const express = require('express');
const commentController = express.Router();
const post = require('../models/post.js');

    commentController.post('/posts/comments/new/',(req,res)=>{

	Comment.create(req.body.nameOfCommentValue)
	.then(comment =>{
		res.redirect(`/posts/${req.body.postId}`);
		console.log(req.body)
		});

	})

   commentController.delete('/posts/:postId/comments/:id', function (req, res) {
       console.log("DELETE comment");
       Comment.findByIdAndDelete(req.params.id).then((comment) => {
           res.redirect('/posts/:postId');
  }).catch((err) => {
    console.log(err.message);
  })
})

module.exports = commentController;
