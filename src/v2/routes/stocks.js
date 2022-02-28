const express = require('express');
const stockHandler = require('../handlers/stockHandler');
const stockMiddleware = require('../middlewares/stocksMiddleware');

const router = express.Router();

router.use(stockMiddleware.parseQueryParams);

router.get('/', stockMiddleware.parsePaginationParams, stockHandler.getStocks);
router.get('/:symbol', stockHandler.getStockBySymbol);

module.exports = router;
