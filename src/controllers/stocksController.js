const mongodbConfig = require('../configs/mongodbConfig');
const mongodbStockService = require('../services/mongodbStockService');
const mongoDbStockView = require('../dto/stockDTO');

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

    req.data = stocks;
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

    req.data = [stock];
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.stockViewModel = async (req, res, next) => {
  try {
    const count = await stockModel.countDocuments();
    return res.status(200).json(mongoDbStockView.createStockViewModel(count, req, req.data));
  } catch (error) {
    return next(error);
  }
};
