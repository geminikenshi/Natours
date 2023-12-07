import express from 'express';

import morgan from 'morgan';
import userRouter from './routes/userRoutes.js';
import tourRouter from './routes/tourRoutes.js';
import AppError from './utils/appError.js';
import errorMiddleware from './controllers/errorController.js';

const app = express();

//
// Middleware

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Request body parser
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//
// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorMiddleware);

export default app;
