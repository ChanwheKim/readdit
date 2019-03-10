const express = require('express');
const mongoose = require('mongoose');
const request = require('request-promise-native');
const cheerio = require('cheerio');
const _ = require('lodash');
const keys = require('../config/keys');
const Category = require('../models/Category');
const { GeneralServiceError, NotAuthenticatedError } = require('../lib/error');
const { authenticate } = require('../lib/authenticate');
const { filterJasonLdKeywords, trimKeywords } = require('../lib/util');
const Article = require('../models/Article');

const router = express.Router();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

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
  console.log('hello');
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

    title = $('title').text()
      || _.result(metaTitle.attribs, 'content', '')
      || _.result(jsonLD, 'headline', '')
      || 'No title';

    image = _.result(metaImage.attribs, 'content', '')
      || (jsonLD && _.result(jsonLD.image, 'url', ''))
      || _.result($('img')[0].attribs, 'src', '')
      || '';

    keywords = trimKeywords(_.result(keywords.attribs, 'content', '').split(' '));

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
      like: 0,
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
});

module.exports = router;
