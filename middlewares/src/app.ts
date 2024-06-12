import express from 'express';
import 'reflect-metadata';
import i18n from './middleware/i18n';
import exampleRoutes from './routes/exampleRoutes';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter, advancedRateLimiter } from './middleware/rateLimiter';
import { enableCors } from './middleware/cors';
import { authJWT } from './middleware/authJWT';
import { requestId } from './middleware/requestId';
import { throttle } from './middleware/throttle';
import { ipWhitelist } from './middleware/ipWhitelist';
import { compress } from './middleware/compress';
import { upload } from './middleware/upload';
import { paginate } from './middleware/pagination';
import { getStatistics, getSalesByDate } from './utils/statistics';


const app = express();
const PORT = process.env.PORT || 3000;

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

app.get('/data', cacheMiddleware, paginate, (req, res) => {
  const data = [
    // your data here
  ];
  const { limit, offset } = req.pagination;
  const paginatedData = data.slice(offset, offset + limit);
  res.json(paginatedData);
});


app.get('/api/sales-by-date', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).send('Start date and end date are required');
  }

  try {
    const salesData = await getSalesByDate(new Date(startDate as string), new Date(endDate as string));
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/statistics', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).send('Start date and end date are required');
  }

  try {
    const statistics = await getStatistics(new Date(startDate as string), new Date(endDate as string));
    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(express.json());
app.use(requestId);
app.use(requestLogger);
app.use(enableCors);
app.use(authJWT); // Apply JWT authentication globally or on specific routes
app.use(ipWhitelist); // Apply IP whitelisting
app.use(throttle); // Apply request throttling
app.use(compress); // Apply response compression
app.use(i18n.middleware.handle(i18n)); // Apply localization middleware
app.use('/api', advancedRateLimiter, exampleRoutes);
app.use(errorHandler);
// app.use('/api', apiLimiter, exampleRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
