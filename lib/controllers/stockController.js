const databaseController = require('../database/controller/databaseController');

function getStocks(req, res) {
  return databaseController('getStocks', req);
}

function getStock(req, res) {
  return databaseController('getStock', req);
}

module.exports = {
  getStocks,
  getStock,
};
