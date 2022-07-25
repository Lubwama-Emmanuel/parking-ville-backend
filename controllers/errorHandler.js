const AppError = require('../utils/appError');

const handleCastErroDB = (error) => {
  const message = `Invalid: ${error.path}: ${error.value}.`;
  return next(new AppError(message, 400));
};

const handleMongoErrorDB = (error) => {
  const message = 'Duplicate Name used';
  return next(new AppError(message, 400));
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational error: The one we can trust
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming Error the one we not sure about : Dont leak details to client
  } else {
    // 1) Log error in heroku
    console.error('ERROR', err);

    // 2) Send Generic Message to Client
    res.status(500).json({
      status: 'Error',
      message: 'Something Went Wrong, But dont worry its not Your Fault',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = { ...err };
    if (error.name == 'CastError') {
      error = handleCastErroDB(error);
    } else if (error.name == 'MongoError') {
      error = handleMongoErrorDB(error);
    }
    sendErrorProd(error, res);
  }
};
