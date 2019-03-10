const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: String,
  description: String,
  keywords: [String],
  like: Number,
  author: String,
  categoryId: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

module.exports = mongoose.model('articles', articleSchema);
