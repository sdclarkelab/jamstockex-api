const mongodbSerializer = require('../db/mongodb/serializers/mongodbSerializer');

class StockService {
  constructor(stockModel) {
    this.stockModel = stockModel;
  }

  async getStockBySymbol(symbol, showFields) {
    try {
      const serializedField = mongodbSerializer.serializeField('symbol', symbol);

      const stock = await this.stockModel.findOne(serializedField)
        .select(mongodbSerializer.serializeArrayString(showFields))
        .lean({ virtuals: true });

      return stock;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async getAllStocks(filter, showFields, page) {
    try {
      const serializedFilter = mongodbSerializer.serializeFilter(filter);

      const stocks = await this.stockModel.find(serializedFilter)
        .select(mongodbSerializer.serializeArrayString(showFields))
        .limit(page.limit)
        .skip(page.page)
        .lean({ virtuals: true })
        .exec();

      const count = await this.stockModel.countDocuments();

      return {
        stocks,
        count,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = StockService;
