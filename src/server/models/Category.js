const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  articleIds: [mongoose.Schema.Types.ObjectId],
  count: { type: Number, required: true },
});

module.exports = mongoose.model('categories', categorySchema);
