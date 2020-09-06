const _ = require('lodash');
const moment = require('moment');
const StockModel = require('../models/stocks.model');

exports.list = (req, res) => {
  console.log(`${req.url}`);

  const limit = _.get(req.query, 'limit', 0) <= 100 ? parseInt(req.query.limit, 10) : 10;
  const projection = _.get(req.query, 'projection', '');
  const pageNumber = parseInt(_.get(req.query, 'page', 0), 10);
  const symbols = _.get(req.query, 'symbols', '').replace(/\s/g, '').split(',');

  StockModel.list(symbols, limit, pageNumber, projection)
    .then((result) => {
      let lastUpdatedDate = result[0].last_updated_date;

      result.forEach((element) => {
        if (moment(element.last_updated_date).diff(moment(lastUpdatedDate)) > 0) {
          lastUpdatedDate = element.last_updated_date;
        }
      });

      const finalResponse = {
        result,
        lastUpdatedDate,
      };

      res.status(200).send(finalResponse);
    });
};

exports.getBySymbol = (req, res) => {
  console.log(`${req.url}`);

  const projection = _.get(req.query, 'projection', '');
  const symbol = _.get(req.params, 'symbol', '');

  StockModel.findBySymbol(symbol, projection)
    .then((result) => {
      res.status(200).send(result || {});
    });
};
