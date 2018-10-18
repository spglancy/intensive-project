const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('./verifyToken.js');

/**
 * Renders Signup template
 */
router.get('/', (req, res) => {
  res.render('signup');
})

/**
 * Renders login page
 */

router.get('/login', (req, res) => {
  res.render('login');
})

/**
 *  Register usr with this endpoint 
 */

router.post('/register', function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).redirect('/posts');
    });
});


/**
 * Logs the user in.
 */

router.post('/login', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401);
  });
  res.redirect(`/posts/${user.userId}`);
});

module.exports = router;
