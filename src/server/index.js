const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const index = require('./routes/index');
const { NotFoundError } = require('./lib/error');
require('./models/User');
require('./services/passport');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && (!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
    res.redirect('https://' + req.get('Host') + req.url);
  } else {
    next();
  }
});

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.use('/api', index);

app.use(express.static('dist'));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  res.status(err.state || 500);

  res.render('error', { message: err.message });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
