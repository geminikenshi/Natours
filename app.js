import express from 'express';

import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import tourRouter from './routes/tourRoutes.js';

const app = express();

//
// Middleware

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request body parser
app.use(express.json());

// Self defined middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 🙂');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
});

//
// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
