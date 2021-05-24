const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  if (req.get('Content-Type') !== 'application/json') {
    return res.send(400);
  }
  next();
});

module.exports = router;
