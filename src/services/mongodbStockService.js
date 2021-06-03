const _ = require('lodash');
const camelcaseKeys = require('camelcase-keys');

exports.createOptions = (req) => {
  const queryParams = req.query;

  const limit = _.get(queryParams, 'limit', 0) > 0 ? parseInt(queryParams.limit, 10) : 10;
  const fields = _.get(queryParams, 'fields', '');
  const pageNumber = parseInt(_.get(queryParams, 'page', 0), 10);

  const options = {
    limit,
    fields,
    pageNumber,
  };

  return options;
};

exports.createFindAllFilter = (req) => {
  const symbols = _.get(req.query, 'symbols') ? _.get(req.query, 'symbols', '').replace(/\s/g, '').split(',') : [];

  return _.isEmpty(symbols) ? {} : { symbol: { $in: symbols } };
};

exports.createFindOneFilter = (req) => {
  const symbol = _.get(req.params, 'symbol', '');
  return { symbol, currency: 'JMD' };
};

/**
   * Convert object keys to camel case.
   * @param [stock] stocks
   * @returns [stocks]
   */
exports.convertKeysToCamelCase = (mongoDbStockData) => {
  return camelcaseKeys(mongoDbStockData, { deep: true });
};

exports.createLinksHal = (req) => {
  const links = {
    current: {
      href: req.headers.host + req.originalUrl,
    },
    prev: {
      href: req.headers.host + req.originalUrl,
    },
    next: {
      href: req.headers.host + req.originalUrl,
    },
  };
  return links;
};
