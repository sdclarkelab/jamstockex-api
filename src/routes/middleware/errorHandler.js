// Catch 404
exports.notFoundError = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// Log messages
exports.logMessage = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.log(err.stack);

    return res.status(err.status || 500)
      .json({
        errors: {
          message: err.message,
          error: err,
        },
      });
  }
  return next(err);
};

exports.errorHandler = (err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      errors: {
        message: err.message,
        error: {},
      },
    });
};
