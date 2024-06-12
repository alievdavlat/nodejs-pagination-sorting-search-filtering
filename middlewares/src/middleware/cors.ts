import cors from 'cors';

export const corsOptions = {
  origin: 'http://example.com', // Update this with your front-end domain
  optionsSuccessStatus: 200,
};

export const enableCors = cors(corsOptions);
