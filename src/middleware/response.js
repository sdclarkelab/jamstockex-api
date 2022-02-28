/**
 * Add headers to all response objects.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
exports.setResponseHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
};
