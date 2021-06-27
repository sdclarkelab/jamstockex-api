const _ = require('lodash');

/**
 * Middleware that extracts query parameters and create an options object on the request object.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.createParamOptions = (req, res, next) => {
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
  req.options = options;
  next();
};
