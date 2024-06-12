const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db.config')
require('dotenv').config()


// const paginate = require('./middleware/pagination');
// const search = require('./middleware/search');
// const sort = require('./middleware/sort');
// const filter = require('./middleware/filter');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json())
app.use(cors())


// Apply custom middleware globally
// app.use(paginate);
// app.use(search);
// app.use(sort);
// app.use(filter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
