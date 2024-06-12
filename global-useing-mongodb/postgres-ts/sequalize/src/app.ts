import express from 'express';
import 'reflect-metadata';
import { mockAuth } from './middleware/auth';
import { paginate } from './middleware/pagination';
import { search } from './middleware/search';
import { sort } from './middleware/sort';
import { filter } from './middleware/filter';
import { exampleController } from './controllers/exampleController';
import { sequelize } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(mockAuth);
app.get('/examples', [paginate, search, sort, filter], exampleController.getExamples.bind(exampleController));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
