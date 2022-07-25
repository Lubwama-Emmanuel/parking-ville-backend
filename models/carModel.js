const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const carSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      enum: ['trucks', 'personalCars', 'taxis', 'coasters'],
      required: [true, 'Please tell us the type of vehivcle'],
    },
    nameOfDriver: {
      type: String,
      required: [true, 'Please provide Driverz name'],
    },
    numberPlate: {
      type: String,
      required: [true, 'Please provide number plate number'],
    },
    colorTimeOfArrival: {
      type: String,
      required: [true, 'Whats the color time of Arrival'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    randomNo: {
      type: String,
      default: uuidv4(),
    },
    phone: {
      type: Number,
      required: [true, 'Please provide your phone number'],
      min: 10,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
