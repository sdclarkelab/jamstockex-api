const _ = require('lodash');
const StockService = require('../services/stockService');
const StockViewModel = require('../views/StockViews');
const mongodbConfig = require('../db/mongodb/configs/mongodbConfig');

const stockModel = mongodbConfig.getStockModel();

const stockService = new StockService(stockModel);

exports.getStocks = async (req, res, next) => {
  try {
    const stocks = await stockService.getAllStocks(req.parsedQParms.filters,
      req.parsedQParms.showFields, req.parsedQParms.page);
    return res.status(200).json(stocks);
  } catch (error) {
    return next(error);
  }
};

exports.getStockBySymbol = async (req, res, next) => {
  try {
    const symbol = _.get(req.params, 'symbol', '');
    const stock = await stockService.getStockBySymbol(symbol,
      req.parsedQParms.showFields);
    return res.status(200).json(stock);
  } catch (error) {
    return next(error);
  }
};

exports.formatJSON = (req, res, next) => {
  try {
    return res.json(StockViewModel.createStockViewModel(res.body));
  } catch (error) {
    return next(error);
  }
};
