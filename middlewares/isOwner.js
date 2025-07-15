function isOwner(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.role === 'owner') {
    return next();
  }
  req.flash('error', 'You are not authorized to access this page.');
  res.redirect('/login'); // Or a 403 page
}

module.exports = { isOwner };
