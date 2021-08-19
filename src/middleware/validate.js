const express = require('express');
const status = require('http-status');

const router = express.Router();

/**
 * Validate request object.
 */
router.use((req, res, next) => {
  if (req.method !== 'GET') {
    req.customError = true;
    return next(new Error(status[status.METHOD_NOT_ALLOWED]));
  }

  return next();
});

module.exports = router;
