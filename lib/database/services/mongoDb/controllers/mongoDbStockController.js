const _ = require('lodash');
const mongoDbStockService = require('../services/mongoDbStockService');
const stockViewModel = require('../views/mongoDbStockView');

function mongoDbServiceFactory(action, queryParms) {
  const limit = _.get(queryParms, 'limit', 0) > 0 ? parseInt(queryParms.limit, 10) : 10;
  const fields = _.get(queryParms, 'fields', '');
  const pageNumber = parseInt(_.get(queryParms, 'page', 0), 10);
  const symbols = _.get(queryParms, 'symbols') ? _.get(queryParms, 'symbols', '').replace(/\s/g, '').split(',') : [];

  const options = {
    limit,
    fields,
    pageNumber,
  };

  const filter = _.isEmpty(symbols) ? {} : { symbol: { $in: symbols } };

  // Selects the correct service.
  const result = action === 'getStock'
    ? mongoDbStockService.getStock(filter, options)
    : mongoDbStockService.getStocks(filter, options);

  return result.then((res) => stockViewModel.createStockViewModel(res));
}

module.exports = { mongoDbServiceFactory };
