module.exports = function sort(req, res, next) {
  const sortField = req.query.sortField || 'createdAt';
  const sortOrder = req.query.sortOrder || 'asc';

  req.sort = { [sortField]: sortOrder === 'asc' ? 1 : -1 };
  next();
};
