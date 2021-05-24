const _ = require('lodash');
const mongoDbStockService = require('../services/mongoDbStockService');
const stockViewModel = require('../views/mongoDbStockView');

function mongoDbServiceFactory(action, req) {
  const queryParams = req.query;

  const limit = _.get(queryParams, 'limit', 0) > 0 ? parseInt(queryParams.limit, 10) : 10;
  const fields = _.get(queryParams, 'fields', '');
  const pageNumber = parseInt(_.get(queryParams, 'page', 0), 10);
  const symbols = _.get(queryParams, 'symbols') ? _.get(queryParams, 'symbols', '').replace(/\s/g, '').split(',') : [];

  const options = {
    limit,
    fields,
    pageNumber,
  };

  const filter = _.isEmpty(symbols) ? {} : { symbol: { $in: symbols } };

  // Selects the correct service.
  const result = action === 'getStock'
    ? mongoDbStockService.getStock(_.get(req.params, 'symbol', ''), options)
    : mongoDbStockService.getStocks(filter, options);

  return result.then((res) => stockViewModel.createStockViewModel(res));
}

module.exports = { mongoDbServiceFactory };
