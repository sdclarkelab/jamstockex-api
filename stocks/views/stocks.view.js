const StockController = require('../controllers/stocks.controller');
const StockModel = require('../models/stocks.model');

exports.getStocks = (req, res) => {
  const limit = _.get(req.query, 'limit', 0) <= 100 ? parseInt(req.query.limit, 10) : 10;
  const projection = _.get(req.query, 'projection', '');
  const pageNumber = parseInt(_.get(req.query, 'page', 0), 10);
  const symbols = _.get(req.query, 'symbols', '').replace(/\s/g, '').split(',');

  StockModel.getStocks(symbols, limit, pageNumber, projection)
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
