const _ = require('lodash');
const mongoDbStockService = require('../services/mongoDbStockService');
const stockViewModel = require('../views/mongoDbStockView');

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

  // Selects the correct service.
  const result = action === 'getStock'
    ? mongoDbStockService.getStock(filter, options)
    : mongoDbStockService.getStocks(filter, options);

  return result.then((res) => stockViewModel.createStockViewModel(res));
}

module.exports = { mongoDbServiceFactory };
