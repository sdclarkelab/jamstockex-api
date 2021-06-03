const mongodbStockService = require('../services/mongodbStockService');

exports.createStockViewModel = (count = 0, req, mongoDbStockData) => {
  const stocks = mongodbStockService.convertKeysToCamelCase(mongoDbStockData);
  return {
    stocks,
    ...(stocks.length > 0 && { stockCount: stocks.length }),
    ...(count > 0 && { total: count }),
    ...(stocks.length > 1 && { links: mongodbStockService.createLinksHal(req) }),
  };
};
