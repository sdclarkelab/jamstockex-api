const _ = require('lodash');

const StockService = (function () {
  // ************** Private Functions **************

  // ************** Private Functions **************
  return {
    createOptions: (req) => {
      const queryParams = req.query;

      const limit = _.get(queryParams, 'limit', 0) > 0 ? parseInt(queryParams.limit, 10) : 10;
      const fields = _.get(queryParams, 'fields', '');
      const pageNumber = parseInt(_.get(queryParams, 'offset', 0), 10);
      const search = _.get(queryParams, 'search', '');

      const options = {
        limit,
        fields,
        pageNumber,
        search,
      };

      return options;
    },

    createFindAllFilter: (req) => {
      const symbols = _.get(req.query, 'symbols') ? _.get(req.query, 'symbols', '').replace(/\s/g, '').split(',') : [];

      return _.isEmpty(symbols) ? {} : { symbol: { $in: symbols } };
    },

    createFindOneFilter: (req) => {
      const symbol = _.get(req.params, 'symbol', '');
      return { symbol, currency: 'JMD' };
    },
  };
}());

module.exports = StockService;
