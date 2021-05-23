const _ = require('lodash');
const mongoDbConnection = require('../helper/mongoDbConnection');
const mongoDbHelper = require('../helper/mongoDbHelper');

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

function mongoDbServiceFactory(action, queryFilter = {}) {
  const limit = _.get(queryFilter, 'limit', 0) > 0 ? parseInt(queryFilter.limit, 10) : 10;
  const projection = _.get(queryFilter, 'projection', '');
  const pageNumber = parseInt(_.get(queryFilter, 'page', 0), 10);
  const symbols = _.get(queryFilter, 'symbols') ? _.get(queryFilter, 'symbols', '').replace(/\s/g, '').split(',') : [];

  const options = {
    limit,
    projection,
    pageNumber,
    symbols,
  };

  const filter = _.isEmpty(symbols) ? {} : { symbol: { $in: symbols } };

  const result = action === 'getStock' ? getStock(filter, options) : getStocks(filter, options);
  return result.then((res) => mongoDbHelper.convertKeysToCamelCase(res));
}

module.exports = { mongoDbServiceFactory };
