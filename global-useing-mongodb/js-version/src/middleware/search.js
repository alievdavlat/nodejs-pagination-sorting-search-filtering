module.exports = function search(req, res, next) {
  const searchQuery = req.query.search || '';
  req.search = searchQuery;
  next();
};
