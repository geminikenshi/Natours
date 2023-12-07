import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalide ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const value = err.message.match(/"(.*?)"/);

  const message = `Duplicate field value: ${value[1]}`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(' & ')}`;
  return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // Log error
    console.error(err);

    // Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

    sendErrorProd(error, res);
  }
};

export default errorMiddleware;
