const mongoDbService = require('../services/mongoDb/service/mongoDbService');

function databaseController(action, data = null) {
  return mongoDbService.mongoDbServiceFactory(action, data);
}

module.exports = databaseController;
