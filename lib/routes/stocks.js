const express = require('express');
const databaseController = require('../database/controller/databaseController');

const router = express.Router();

router.get('/', (req, res) => {
  databaseController('getStocks', req).then((result) => {
    res.status(200).json(result);
  });
});

router.get('/:symbol', (req, res) => {
  databaseController('getStock', req).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
