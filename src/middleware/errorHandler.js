const status = require('http-status');

/**
 * Not found error handler middleware.
 * @param {Object} req
 * @param {Object} res
 */
exports.notFound = (req, res, next) => {
  res.status(status.NOT_FOUND).send({
    error: {
      code: status.NOT_FOUND,
      message: status[status.NOT_FOUND],
    },
  });
};

/**
 * Catch generic errors.
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.genericErrorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = process.env.NODE_ENV === 'production' && !req.customError
    ? status[status.INTERNAL_SERVER_ERROR]
    : err.message || status[errorStatus];

  res.status(errorStatus)
    .json({
      errors: {
        code: errorStatus,
        message: errorMessage,
      },
    });
};
