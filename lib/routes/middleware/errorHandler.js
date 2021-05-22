const express = require('express');

const router = express.Router();

router.use((err, req, res, next) => {
  res.send({ errorMessage: 'Not Found' });
});

module.exports = { router };
