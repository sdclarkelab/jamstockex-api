const StockModel = require('../models/stocks.model');
const _ = require('lodash');

exports.list = (req, res) => {
  console.log(`${req.url}`);

  let limit = _.get(req.query, 'limit', 0) <= 100 ? parseInt(req.query.limit) : 10;
  let projection = _.get(req.query, 'projection', '');
  let pageNumber = parseInt(_.get(req.query, 'page', 0));
  let symbols = _.get(req.query, 'symbols', '').replace(/\s/g,'').split(',');

  StockModel.list(symbols, limit, pageNumber, projection)
  .then((result) => {
      res.status(200).send(result);
  });
};

exports.getBySymbol = (req, res) => {
  console.log(`${req.url}`);

  let projection = _.get(req.query, 'projection', '');
  let symbol = _.get(req.params, 'symbol', '');

  StockModel.findBySymbol(symbol, projection)
  .then((result) => {
      res.status(200).send(result || {});
  });
};