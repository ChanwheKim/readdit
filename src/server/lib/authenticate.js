const { NotAuthenticatedERror } = require('./error');

function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new NotAuthenticatedERror());
  }
}

module.exports = {
  authenticate,
};
