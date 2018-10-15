const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const comment = mongoose.model('comment', {
  comment: String,
  postId: { type: Schema.Types.ObjectId, ref: 'post' },
});

module.exports = comment;
