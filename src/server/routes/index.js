const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const Categories = require('../models/Category');
const { GeneralServiceError } = require('../lib/error');

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
    const categories = await Categories.find();

    res.json(categories);
  } catch (err) {
    next(new GeneralServiceError());
  }
});

module.exports = router;
