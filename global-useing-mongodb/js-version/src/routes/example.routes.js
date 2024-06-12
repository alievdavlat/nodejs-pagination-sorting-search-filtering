// Example route
const router = require("express").Router();
const exampleController = require("../controller/example.controller")

const paginate = require('../middleware/pagination');
const search = require('../middleware/search');
const sort = require('../middleware/sort');
const filter = require('../middleware/filter');


// for only one route 
app.get('/examples', [paginate, search, sort, filter], exampleController.getAll);


module.exports = router


