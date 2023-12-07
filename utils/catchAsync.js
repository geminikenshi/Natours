// eslint-disable-next-line arrow-body-style
const catchAsync = (fn) => {
  // Execute the asynchronous function (fn) and return a promise.
  // If the promise is rejected (an error occurs), catch the error and pass it to the next middleware.
  return (req, res, next) => fn(req, res, next).catch(next);
};

export default catchAsync;
