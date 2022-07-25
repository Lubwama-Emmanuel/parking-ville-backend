const Car = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');

exports.registerCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: {
      car: newCar,
    },
  });
});

exports.getModel = catchAsync(async (req, res, next) => {
  const model = await Car.aggregate([
    {
      $match: { colorTimeOfArrival: 'morning' },
    },
    {
      $group: {
        _id: '$model',
        numCars: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    data: {
      car: model,
    },
  });
});

exports.getAllCarsRegistered = catchAsync(async (req, res, next) => {
  const cars = await Car.find();
  res.status(200).json({
    status: 'success',
    data: {
      cars,
    },
  });
});
