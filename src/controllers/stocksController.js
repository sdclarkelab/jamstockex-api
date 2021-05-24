const _ = require('lodash');
const mongodbConfig = require('../configs/mongodbConfig');
const mongodbStockService = require('../services/mongodbStockService');
const mongoDbStockView = require('../views/mongoDbStockView');

const stockModel = mongodbConfig.getStockModel();

exports.getStocks = async (req, res, next) => {
  try {
    const options = mongodbStockService.createOptions(req);
    const filter = mongodbStockService.createFindAllFilter(req);

    const stocks = await stockModel.find(filter)
      .select(options.fields)
      .limit(options.limit)
      .skip(options.limit * options.pageNumber)
      .lean({ virtuals: true })
      .exec();

    req.stocks = stocks;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.getStock = async (req, res, next) => {
  try {
    const options = mongodbStockService.createOptions(req);

    const stock = await stockModel.findOne(mongodbStockService.createFindOneFilter(req))
      .select(options.fields)
      .lean({ virtuals: true });

    req.stocks = stock;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.applyStockViewModel = (req, res) => {
  res.json(mongoDbStockView.createStockViewModel(req.stocks));
};
