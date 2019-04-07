const mongoose = require('mongoose');
const Category = require('../models/Category');
const Article = require('../models/Article');
const { GeneralServiceError, WrongEntityError } = require('../lib/error');

async function getList(req, res, next) {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (err) {
    next(new GeneralServiceError());
  }
}

async function getArticlesByCategory(req, res, next) {
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
}

module.exports = {
  getList,
  getArticlesByCategory,
};
