const request = require('request-promise-native');
const cheerio = require('cheerio');
const _ = require('lodash');
const Category = require('../models/Category');
const Article = require('../models/Article');
const { filterJasonLdKeywords, trimKeywords, filterTags } = require('../lib/util');
const { GeneralServiceError, WrongEntityError } = require('../lib/error');

async function makeNewList(req, res, next) {
  const { url } = req.body;
  const { categoryId } = req.body;
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
}

async function searchKeyword(req, res, next) {
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
}

module.exports = {
  makeNewList,
  searchKeyword,
};
