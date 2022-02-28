const _ = require('lodash');
const StockService = require('../services/stockService');
const mongodbConfig = require('../db/mongodb/configs/mongodbConfig');
const helper = require('../utils/helper');
const StockViewModel = require('../views/StockViews');

const stockModel = mongodbConfig.getStockModel();
const stockService = new StockService(stockModel);

exports.getStocks = async (req, res, next) => {
  try {
    const result = await stockService.getAllStocks(req.parsedQParms.filters,
      req.parsedQParms.showFields, req.parsedQParms.page);

    const reqUrlObj = new helper.CustomUrl(req);
    const pageNumber = req.parsedQParms.page.page;
    const pageLimit = req.parsedQParms.page.limit;

    return res.status(200).json(StockViewModel.createStocksViewModel(reqUrlObj, result.stocks,
      result.count, pageNumber, pageLimit));
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
