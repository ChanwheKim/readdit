const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    (req, res, next) => {
      console.log(22222);
      next();
    },
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
      // res.end();
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/test', (req, res) => {
    res.send('test');
  });
};
