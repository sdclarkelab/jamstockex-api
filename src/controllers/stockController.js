const mongodbConfig = require('../configs/mongodbConfig');
const StockService = require('../services/stockService');
const StockViewModel = require('../viewModels/stockViewModel');

const stockModel = mongodbConfig.getStockModel();

exports.getStocks = async (req, res, next) => {
  try {
    const options = StockService.createOptions(req);
    const filter = StockService.createFindAllFilter(req);

    const stocks = await stockModel.find(filter)
      .select(options.fields)
      .limit(options.limit)
      .skip(options.limit * options.pageNumber)
      .lean({ virtuals: true })
      .exec();

    const count = await stockModel.countDocuments();

    return res.status(200).json(StockViewModel.createStocksViewModel(req, stocks, count));
  } catch (error) {
    return next(error);
  }
};

exports.getStock = async (req, res, next) => {
  try {
    const options = StockService.createOptions(req);

    const stock = await stockModel.findOne(StockService.createFindOneFilter(req))
      .select(options.fields)
      .lean({ virtuals: true });

    return res.status(200).json(StockViewModel.createStockViewModel(stock));
  } catch (error) {
    return next(error);
  }
};

exports.extractQueryParams = (req, res, next) => {
  try {
    req.params = StockService.createOptions(req);
    return next();
  } catch (error) {
    return next(error);
  }
};
