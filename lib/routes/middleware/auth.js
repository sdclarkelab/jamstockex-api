const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.is('application/json')) {
    res.send(400);
  }
  next();
});

module.exports = { router };
