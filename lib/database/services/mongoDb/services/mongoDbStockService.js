const mongoDbConnection = require('../helper/mongoDbConnection');

const stockModel = mongoDbConnection.getStockModel();

function getStocks(filter = {}, options) {
  const stocks = stockModel.find(filter)
    .select(options.fields)
    .limit(options.limit)
    .skip(options.limit * options.pageNumber)
    .lean({ virtuals: true })
    .exec();
  return stocks;
}

function getStock(symbol, options) {
  const stock = stockModel.findOne({ symbol })
    .select(options.fields)
    .lean({ virtuals: true });
  return stock;
}

module.exports = {
  getStocks,
  getStock,
};