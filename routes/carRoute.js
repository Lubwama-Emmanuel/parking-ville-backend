const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.route('/registerCar').post(carController.registerCar);
router.get('/getRegisteredCars', carController.getModel);
router.get('/getAllCars', carController.getAllCarsRegistered);

module.exports = router;
