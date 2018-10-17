const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const comment = mongoose.model('comment', {
  content: String,
  postId: { type: String, required: true },
});

module.exports = comment;
