const mongoDbStockController = require('../services/mongoDb/controllers/mongoDbStockController');

function databaseController(action, data = null) {
  return mongoDbStockController.mongoDbServiceFactory(action, data);
}

module.exports = databaseController;
