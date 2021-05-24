const mongoDbStockController = require('../services/mongoDb/controllers/mongoDbStockController');

function databaseController(action, queryParms) {
  return mongoDbStockController.mongoDbServiceFactory(action, queryParms);
}

module.exports = databaseController;
