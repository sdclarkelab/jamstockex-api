const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  if (req.get('Accept') !== 'application/json') {
    return res.sendStatus(400);
  }
  return next();
});

module.exports = router;
