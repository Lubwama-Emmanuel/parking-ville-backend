const express = require('express');
const router = express.Router();

const priceController = require('../controllers/priceController');

router.post('/createReceipt', priceController.createReceipt);
router.get('/carPrice/:id', priceController.getCarPrice);
router.get('/receipts', priceController.getAllReceipts)

router.get('/carReceipt/:id', priceController.getCarReceipt)

module.exports = router;
