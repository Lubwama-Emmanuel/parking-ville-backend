const express = require('express');

const carRoute = require('./routes/carRoute');
const priceRoute = require('./routes/priceRoute');
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/v1/parking/cars', carRoute);
app.use('/api/v1/parking/price', priceRoute);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `This Route ${req.originalUrl} is not defined on this server`,
      404
    )
  );
});

app.use(errorHandler);
module.exports = app;
