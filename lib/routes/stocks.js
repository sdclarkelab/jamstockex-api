const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stocks', (req, res) => {
  res.json(stockController.getStocks);
});

router.get('/stock/:symbol', (req, res) => {
  res.json(stockController.getStock);
});

module.exports = { router };
