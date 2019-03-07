const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  articleIds: Array,
  count: String,
});

module.exports = mongoose.model('categories', categorySchema);
