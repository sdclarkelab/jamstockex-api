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

    return res.status(200).json(mongoDbStockView.createStockViewModel(stocks));
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

    return res.status(200).json(mongoDbStockView.createStockViewModel(stock));
  } catch (error) {
    return next(error);
  }
};
