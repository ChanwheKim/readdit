const express = require('express');
const mongoose = require('mongoose');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const _ = require('lodash');
const keys = require('../config/keys');
const Category = require('../models/Category');
const { GeneralServiceError, WrongEntityError, NotAuthenticatedError } = require('../lib/error');
const { authenticate } = require('../lib/authenticate');
const { filterJasonLdKeywords, trimKeywords, filterTags } = require('../lib/util');
const Article = require('../models/Article');
const Like = require('../models/Like');

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

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (err) {
    next(new GeneralServiceError());
  }
});

router.get('/logout', (req, res) => {
  res.json('here');
});

router.post('/articles/new', authenticate, async (req, res, next) => {
  const url = req.body.url;
  const categoryId = req.body.categoryId;
  let html;
  let title;
  let image;
  let description;
  let author;

  try {
    const existingArticle = await Article.findOne({ url });
    const defaultObj = {};

    if (existingArticle) {
      return res.json({ message: 'This url was already registered.' });
    }

    try {
      html = await request(url);
    } catch (err) {
      return res.json({ message: 'Please check your url again. :)' });
    }

    const $ = cheerio.load(html);
    const jsonLD = JSON.parse($('script[type="application/ld+json"]').html());

    const metaTitle = $('meta[property="og:title"]')[0]
      || $('meta[name="title"]')[0]
      || $('meta[property="twitter:title"]')[0]
      || defaultObj;

    const metaImage = $('meta[property="og:image"]')[0]
      || $('meta[name="image"]')[0]
      || $('meta[name="twitter:image:src"]')[0]
      || defaultObj;

    let keywords = $('meta[property="og:keywords"]')[0]
      || $('meta[name="keywords"]')[0]
      || $('meta[property="keywords"]')[0]
      || $('meta[name="news_keywords"]')[0]
      || { attribs: { content: filterJasonLdKeywords(jsonLD) } }
      || defaultObj;

    const metaDiscription = $('meta[property="og:description"]')[0]
      || $('meta[name="description"]')[0]
      || $('meta[property="description"]')[0]
      || $('meta[name="twitter:description"]')[0]
      || defaultObj;

    const metaAuthor = $('meta[property="og:author"]')[0]
      || $('meta[name="author"]')[0]
      || $('meta[property="author"]')[0]
      || defaultObj;

    title = $('title').first().text()
      || _.result(metaTitle.attribs, 'content', '')
      || _.result(jsonLD, 'headline', '')
      || 'No title';

    image = _.result(metaImage.attribs, 'content', '')
      || (jsonLD && _.result(jsonLD.image, 'url', ''))
      || ($('img')[0] && _.result($('img')[0].attribs, 'src', ''))
      || '';

    keywords = trimKeywords(_.result(keywords.attribs, 'content', '').split(' '));

    const tags = filterTags($('meta[property="article:tag"]'));

    keywords = keywords.concat(tags);
    
    description = _.result(metaDiscription.attribs, 'content', '')
      || (jsonLD && jsonLD.description)
      || '';

    author = _.result(metaAuthor.attribs, 'content', '')
      || (jsonLD && _.result(jsonLD.author, 'name', ''))
      || '';

    const existingCategory = await Category.findById(categoryId);

    const newArticle = await new Article({
      title,
      url,
      userId: req.user.id,
      image,
      description,
      categoryId: [existingCategory.id],
      keywords,
      like: [],
      author,
    }).save();

    req.user.articleIds.push(newArticle.id);
    req.user.save();

    if (existingCategory) {
      existingCategory.articleIds.push(newArticle.id);
      existingCategory.count++;

      await existingCategory.save();
    } else {
      return res.json({ message: 'Not possible to create a new category at the moment' });
    }

    res.json(newArticle);
  } catch (err) {
    res.json(new GeneralServiceError());
  }
  res.json('testing..');
});

router.post('/users/:user_id/articles/:article_id/like', authenticate, async (req, res, next) => {
  if (!req.params.user_id === req.user.id) {
    return next(new WrongEntityError());
  }

  const articleId = req.params.article_id;
  let article;
  let newLike;

  try {
    article = await Article.findById(articleId);
  } catch (err) {
    return res.json(new WrongEntityError());
  }

  if (!article) {
    return res.json(new WrongEntityError());
  }

  const likedBefore = req.user.like.some((like) => {
    let found = false;

    article.like.forEach((articleLike) => {
      if (like.equals(articleLike)) {
        found = true;
      }
    });

    return found;
  });

  if (likedBefore) {
    return res.json({ message: 'You already liked this article.' });
  }

  try {
    newLike = await new Like({
      userId: req.user.id,
      articleId,
    }).save();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  try {
    article.like.push(newLike.id);
    req.user.like.push(newLike.id);

    await article.save();
    await req.user.save();
  } catch (err) {
    return next(new GeneralServiceError());
  }

  res.json({
    like: req.user.toObject().like,
    article,
  });
});

router.delete('/users/:user_id/articles/:article_id/like', authenticate, async (req, res, next) => {
  if (!req.params.user_id === req.user.id) {
    return next(new WrongEntityError());
  }

  const articleId = req.params.article_id;
  let article;

  try {
    article = await Article.findById(articleId);
  } catch (err) {
    return res.json(new WrongEntityError());
  }

  if (!article) {
    return res.json(new WrongEntityError());
  }

  const like = await Like.findOne({ articleId, userId: req.user.id });

  req.user.like.pull(like.id);
  article.like.pull(like.id);

  await req.user.save();
  await article.save();

  await Like.deleteOne({ articleId, userId: req.user.id }, (err) => {
    if (err) {
      return res.json(new GeneralServiceError());
    }

    return article;
  });

  res.json({
    like: req.user.toObject().like,
    article,
  });
});

router.get('/categories/:category_id/articles', async (req, res, next) => {
  const id = req.params.category_id;
  let category;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new WrongEntityError());
  }

  try {
    category = await Category.findById(id);
  } catch (err) {
    return next(new GeneralServiceError());
  }

  if (!category) {
    return next(new WrongEntityError());
  }

  try {
    const articles = await Promise.all(
      category.articleIds.map(articleId => Article.findById(articleId))
    );

    res.json(articles);
  } catch (err) {
    next(new GeneralServiceError());
  }
});

router.get('/users/:user_id/articles', async (req, res, next) => {
  if (!req.params.user_id === req.user.id) {
    return next(new WrongEntityError());
  }

  try {
    const articles = await Promise.all(
      req.user.articleIds.map(id => Article.findById(id))
    );

    res.json(articles);
  } catch (err) {
    next(new GeneralServiceError());
  }
});

router.get('/articles/:keyword', async (req, res, next) => {
  const keyword = req.params.keyword.replace(/[^a-zA-Z0-9\u3131-\uD79D]/g, '');
  let result;

  if (keyword) {
    try {
      result = await Article.find({ $text: { $search: keyword } });
    } catch (err) {
      return res.json({ error: err.message });
    }

    return res.json(result);
  }

  return res.json(new WrongEntityError());
});

module.exports = router;
