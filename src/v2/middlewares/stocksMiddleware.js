const _ = require('lodash');
const status = require('http-status');

/**
 * Middleware that extracts query parameters and create an options object on the request object.
 */
function parseQueryParams(req, res, next) {
  try {
    const queryParams = req.query;

    req.parsedQParms = {
      filters: {
        hasDividend: _.get(queryParams, 'hasDividend', ''),
        dividendAmt: _.get(queryParams, 'dividendAmt', ''),
        market: _.get(queryParams, 'market', ''),
        type: _.get(queryParams, 'type', ''),
        currency: _.get(queryParams, 'currency', ''),
        symbols: _.get(queryParams, 'symbols', ''),
      },
      showFields: _.get(queryParams, 'fields', ''),
    };
    return next();
  } catch (error) {
    return next(new Error(status[status.BAD_REQUEST]));
  }
}

function parsePaginationParams(req, res, next) {
  try {
    const queryParams = req.query;

    req.parsedQParms.page = {
      limit: (() => {
        const reqLimit = parseInt(_.get(queryParams, 'limit', 10), 10);
        if (reqLimit > 200) {
          return 200;
        }
        if (reqLimit <= 0) {
          return 10;
        }
        return reqLimit;
      })(),
      offset: parseInt(_.get(queryParams, 'offset', 0), 10),
    };
    return next();
  } catch (error) {
    return next(new Error(status[status.BAD_REQUEST]));
  }
}

function parsePathParams(req, res, next) {
  try {
    req.parsedPParms = {
      symbol: _.get(req.params, 'symbol', ''),
    };
    return next();
  } catch (error) {
    return next(new Error(status[status.BAD_REQUEST]));
  }
}

module.exports = {
  parseQueryParams,
  parsePaginationParams,
  parsePathParams,
};
