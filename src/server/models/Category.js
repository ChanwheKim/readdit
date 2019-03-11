const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  articleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'article' }],
  count: { type: Number, required: true },
});

module.exports = mongoose.model('categories', categorySchema);
