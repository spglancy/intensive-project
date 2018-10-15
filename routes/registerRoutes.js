const user = require('../models/user.js');
const saveNewUser = require('../controllers/registerController.js')
const express = require('express');
const registerRoutes = express.Router();

registerRoutes.get('/', (req,res) => {
    res.render('signup');
})

registerRoutes.post('/register', (req, res) => {
    saveNewUser(req);
    res.redirect('/posts')
})

module.exports = registerRoutes;
