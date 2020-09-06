const StockController = require('./controllers/stocks.controller');

exports.routesConfig = (app) => {
  app.get('/stocks', [StockController.list]);
  app.get('/stocks/:symbol', [StockController.getBySymbol]);
};
