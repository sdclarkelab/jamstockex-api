const _ = require('lodash');

/**
 * Middleware that extracts query parameters and create an options object on the request object.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.createParamOptions = (req, res, next) => {
  const queryParams = req.query;

  const limit = (() => {
    const reqLimit = parseInt(_.get(queryParams, 'limit', 10), 10);
    if (reqLimit > 200) {
      return 200;
    }
    if (reqLimit <= 0) {
      return 10;
    }
    return reqLimit;
  })();

  const fields = _.get(queryParams, 'fields', '');
  const offset = parseInt(_.get(queryParams, 'offset', 0), 10);
  const search = _.get(queryParams, 'search', '');

  const options = {
    limit,
    fields,
    offset,
    search,
  };
  req.options = options;
  next();
};
