const mongoDbStockController = require('../services/mongoDb/controllers/mongoDbStockController');

function databaseController(action, req) {
  return mongoDbStockController.mongoDbServiceFactory(action, req);
}

module.exports = databaseController;
