const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  typeOfCar: {
    type: mongoose.Schema.ObjectId,
    ref: 'Car',
  },
  price: {
    type: Number
  }
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
