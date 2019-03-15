const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: String,
  description: String,
  keywords: [String],
  like: [mongoose.Schema.Types.ObjectId],
  author: String,
  categoryId: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

articleSchema.index({ 'title': 'text', 'description': 'text' });

module.exports = mongoose.model('articles', articleSchema);
