import express from 'express';
import connectDB from './config/db.config'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import router  from './routes/example.routes.js'
// import { paginate } from './middleware/pagination';
// import { search } from './middleware/search';
// import { sort } from './middleware/sort';
// import { filter } from './middleware/filter';

const app = express();

const PORT:string | number = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json())
app.use(cors())
app.use(router)

// Apply custom middleware globally
// app.use(paginate);
// app.use(search);
// app.use(sort);
// app.use(filter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
