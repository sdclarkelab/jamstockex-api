const express = require('express');
const stockController = require('../controllers/stockController');
const stockMiddleware = require('./middleware/stocks');

const router = express.Router();

router.get('/', stockMiddleware.createParamOptions, stockController.getStocks);
router.get('/:symbol', stockMiddleware.createParamOptions, stockController.getStock);

module.exports = router;
