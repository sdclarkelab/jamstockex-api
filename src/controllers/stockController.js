const mongodbConfig = require('../configs/mongodbConfig');
const StockService = require('../services/stockService');
const StockViewModel = require('../viewModels/stockViewModel');

const stockModel = mongodbConfig.getStockModel();

exports.getStocks = async (req, res, next) => {
  try {
    const filter = StockService.createFindAllFilter(req);

    const stocks = await stockModel.find(filter)
      .select(req.options.fields)
      .limit(req.options.limit)
      .skip(req.options.limit * req.options.pageNumber)
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
    const stock = await stockModel.findOne(StockService.createFindOneFilter(req))
      .select(req.options.fields)
      .lean({ virtuals: true });

    return res.status(200).json(StockViewModel.createStockViewModel(stock));
  } catch (error) {
    return next(error);
  }
};
