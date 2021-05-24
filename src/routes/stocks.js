const express = require('express');
const stockController = require('../controllers/stocksController');

const router = express.Router();

router.get('/', stockController.getStocks);
router.get('/:symbol', stockController.getStock);
router.use(stockController.applyStockViewModel);

module.exports = router;
