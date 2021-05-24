const mongoDbConnection = require('../helper/mongoDbConnection');

const stockModel = mongoDbConnection.getStockModel();

function getStocks(filter = {}, options) {
  const stocks = stockModel.find(filter)
    .select(options.projection)
    .limit(options.limit)
    .skip(options.limit * options.pageNumber)
    .lean({ virtuals: true })
    .exec();
  return stocks;
}

function getStock(filter = {}, options) {
  const stock = stockModel.findOne(filter)
    .select(options.projection)
    .lean({ virtuals: true });
  return stock;
}

module.exports = {
  getStocks,
  getStock,
};
