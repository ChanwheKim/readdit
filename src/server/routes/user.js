const Article = require('../models/Article');
const Like = require('../models/Like');
const { GeneralServiceError, WrongEntityError } = require('../lib/error');

async function handleLike(req, res, next) {
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
}

async function deleteLike(req, res, next) {
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
}

async function getUserPosts(req, res, next) {
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
}

module.exports = {
  handleLike,
  deleteLike,
  getUserPosts,
};
