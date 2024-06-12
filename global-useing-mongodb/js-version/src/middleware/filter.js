module.exports = function filter(req, res, next) {
  const filters = {};
  for (const key in req.query) {
      if (key !== 'page' && key !== 'limit' && key !== 'sortField' && key !== 'sortOrder' && key !== 'search') {
          filters[key] = req.query[key];
      }
  }
  req.filters = filters;
  next();
};
