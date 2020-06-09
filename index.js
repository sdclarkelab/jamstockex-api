const express = require('express');
const app = express();

const StocksRouter = require('./stocks/routes.config');

require('dotenv').config();

// Set response headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json');

  return next();
});

// Routes
StocksRouter.routesConfig(app);

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
  res.status(404);
  res.send({'errorMessage': 'Not Found'});
});

app.listen(process.env.PORT || 5000, function () {
  console.log('app listening');
});