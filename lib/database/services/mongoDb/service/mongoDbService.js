const mongoDbConnection = require('../helper/mongoDbConnection');
const mongoDbHelper = require('../helper/mongoDbHelper');

const stockModel = mongoDbConnection.getStockModel();

function getStocks(filter = {}) {
  const stocks = stockModel.find(filter).lean();
  return stocks;
}

function getStock(filter = {}) {
  const stock = stockModel.findOne(filter).lean();
  return stock;
}

function mongoDbServiceFactory(action, filter = {}) {
  const dbData = action === 'getStock' ? getStock(filter) : getStocks(filter);
  return dbData.then((res) => mongoDbHelper.convertKeysToCamelCase(res));
}

module.exports = { mongoDbServiceFactory };
