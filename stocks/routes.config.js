const StockController = require('./controllers/stocks.controller');
const StockView = require('./views/stocks.view');

exports.routesConfig = (app) => {
  app.get('/stocks', [StockView.getStocks]);
  app.get('/stocks/:symbol', [StockController.getBySymbol]);
};
