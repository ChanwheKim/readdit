const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  articleIds: [mongoose.Schema.Types.ObjectId],
  like: [mongoose.Schema.Types.ObjectId],
  emails: [Object],
  name: Object,
  image: String,
});

module.exports = mongoose.model('users', userSchema);
