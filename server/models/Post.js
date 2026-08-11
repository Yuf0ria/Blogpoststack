const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true, maxlength: 50000},
  author: { type: String, default: 'Anonymous' },
  imageUrl: { type: String, default: null}
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);