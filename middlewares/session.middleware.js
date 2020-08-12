module.exports.isNotAuthenticated = (req, res, next) => {
  res.locals.user = req.session.currentUser;
  next();
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) next();
  else res.redirect('/login');
};

