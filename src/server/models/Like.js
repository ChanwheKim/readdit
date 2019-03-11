const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  articleId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

module.exports = mongoose.model('like', likeSchema);
