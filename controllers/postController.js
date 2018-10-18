const Post = require('../models/post.js');
const express = require('express');
const postRoutes = express.Router();
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
// const authController = require('./authController.js');
// const verifyToken = require('./verifyToken.js');

postRoutes.get('/', (req, res) => {
    res.redirect('/api/auth/');
})

postRoutes.get('/login', (req, res) => {
    res.redirect('/api/auth/login');
})

postRoutes.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, function (err, post) {
        res.render('post-edit', { post: post });
    })
})

postRoutes.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post)
        res.redirect(`/posts/${post._id}`) // Redirect to post/:id
    }).catch((err) => {
        console.log(err.message)
    })
})

postRoutes.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

postRoutes.delete('/posts/:id', function (req, res) {
    console.log("DELETE post")
    Post.findByIdAndDelete(req.params.id).then((post) => {
        res.redirect('/posts');
    }).catch((err) => {
        console.log(err.message);
    })
})

postRoutes.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then((post) => {
        Comment.find({
            postId: req.params.id
        }).then(comment =>
            res.render('singlepost', {
                post: post,
                comment: comment,
                postId: req.params.id
            }))
    }).catch((err) => {
        console.log(err.message);
    })
})

postRoutes.get('/posts', (req, res) => {
    Post.find().then((post) => {
        res.render('home', {
            post: post
        });
    })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = postRoutes;
