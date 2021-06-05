const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

// Extract query params.
router.use('/', stockController.extractQueryParams);

router.get('/', stockController.getStocks);
router.get('/:symbol', stockController.getStock);

module.exports = router;
