const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema(
  {
    batterySize: {
      type: String,
      required: [true, 'Provide battery size'],
    },
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Providee your phone number'],
      min: 10,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Please provide your gender'],
    },
    NIN_No: {
      type: String,
      required: [true, 'Please provide your NIN number'],
    },
  },
  {
    timestamps: true,
  }
);

const Battery = mongoose.model('Battery', batterySchema);

module.exports = Battery;
