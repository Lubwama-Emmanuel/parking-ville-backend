const mongoose = require('mongoose');

const tyreSchema = new mongoose.Schema({
  tyreSize: {
    type: String,
    required: [true, 'Provide tyre type'],
  },
  make: {
    type: String,
    required: [true, 'Provide tyre type'],
  },
  intentedCarModel: {
    type: String,
    required: [true, 'Provide tyre type'],
  },
});

const Tyre = mongoose.model('Tyre', tyreSchema);

module.exports = Tyre;
