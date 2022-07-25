const Price = require('../models/priceModel');
const Car = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');

exports.createReceipt = catchAsync(async (req, res, next) => {
  const newReceipt = await Price.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: {
      newReceipt,
    },
  });
});

exports.getCarPrice = catchAsync(async (req, res, next) => {
  const carPrice = await Price.findById(req.params.id);

  res.status(201).json({
    status: 'Success',
    data: {
      carPrice,
    },
  });
});

exports.getAllReceipts = catchAsync(async (req, res, next) => {
  const receipts = await Price.find().populate('typeOfCar');
  res.status(201).json({
    status: 'Success',
    data: {
      receipts,
    },
  });
});

const priceCounter = function (time, dayPrice, nightPrice) {
  return time > 12 ? nightPrice : dayPrice;
};

exports.getCarReceipt = catchAsync(async (req, res, next) => {
  let amount;
  const carReceipt = await Car.findById(req.params.id);
  const cars = ['personalCars', 'taxis'];
  const timeSpent = Math.round(
    (Date.now() - carReceipt.date) / (1000 * 60 * 60)
  );
  if (cars.includes(carReceipt.model)) {
    amount = timeSpent < 3 ? 2000 : priceCounter(timeSpent, 3000, 5000);
  } else if (carReceipt.model === 'trucks') {
    amount = timeSpent < 3 ? 2000 : priceCounter(timeSpent, 5000, 10000);
  } else if (carReceipt.model === 'coasters') {
    amount = timeSpent < 3 ? 3000 : priceCounter(timeSpent, 4000, 3000);
  }
  console.log(timeSpent);
  console.log(`${carReceipt.model} has to pay ${amount}`);
  res.status(201).json({
    status: 'Success',
    data: {
      carReceipt,
    },
  });
});
