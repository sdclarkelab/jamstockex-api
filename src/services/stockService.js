const _ = require('lodash');

const StockService = (function () {
  // ************** Private Functions **************
  return {
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
