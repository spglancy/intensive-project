const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project', {useNewUrlParser: true});

const post = mongoose.model('post', {
  user: String,
  content: String,
});

module.exports = post;
