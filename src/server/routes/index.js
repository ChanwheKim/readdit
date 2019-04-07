const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { authenticate } = require('../lib/authenticate');
const articleMiddleware = require('./article');
const category = require('./category');
const user = require('./user');

const router = express.Router();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('An error has occured while connecting.', error);
});

db.once('open', () => {
  console.log('The database has been connected.');
});

router.get('/categories', category.getList);
router.get('/categories/:category_id/articles', category.getArticlesByCategory);

router.post('/articles/new', authenticate, articleMiddleware.makeNewList);
router.get('/articles/:keyword', articleMiddleware.searchKeyword);

router.post('/users/:user_id/articles/:article_id/like', authenticate, user.handleLike);
router.delete('/users/:user_id/articles/:article_id/like', authenticate, user.deleteLike);
router.get('/users/:user_id/articles', authenticate, user.getUserPosts);

module.exports = router;
