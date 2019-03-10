const { NotAuthenticatedError } = require('./error');

function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new NotAuthenticatedError());
  }
}

module.exports = {
  authenticate,
};
