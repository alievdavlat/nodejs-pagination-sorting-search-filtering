const Example = require('../model/example.model')


module.exports = {
  getAll :  async (req, res) => {
    const { limit, skip } = req.pagination;
    const { search } = req;
    const { sort } = req;
    const { filters } = req;
  
    const query = Example.find({ name: new RegExp(search, 'i'), ...filters })
        .limit(limit)
        .skip(skip)
        .sort(sort);
  
    const results = await query.exec();
    res.json(results);
  }
}