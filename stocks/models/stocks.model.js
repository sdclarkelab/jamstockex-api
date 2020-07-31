const mongoose = require('../../common/services/mongoDb.service').mongoose;
const Schema = mongoose.Schema;

// Set Mongoose Schema
let stockSchema = new Schema(
  {
    last_updated_date: {  
      type: Schema.Types.Mixed,
      required: true
    },
    instrument_name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    sector: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true
    },
    is_listed: {
      type: Boolean,
      required: true
    },
    market: {
      type: String,
      required: true
    },
    corporate_action_url: {
      type: String
    },
    dividends: [
      {
        amount: {
          type: Number
        },
        payment_date: {
          type: Date
        },
        execution_date: {
          type: Date
        },
        record_date: {
          type: Date
        }
      }
    ],
    trade_info: {
      volume_traded: {
        type: Number
      },
      dollar_change: {
        type: Number
      },
      market_price: {
        type: Number
      },
      percentage_change: {
        type: Number
      }
    }
  },
  { collection: "stock" }
);

stockSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
stockSchema.set('toJSON', {
  virtuals: true
});
  
// Export stock model
const Stock = mongoose.model("stock", stockSchema);

exports.list = (symbols, perPage, page, projection) => {

  const symbolFilter = symbols != '' ? {symbol: { $in: symbols } }: {};

  return new Promise((resolve, reject) => {
    Stock.find(symbolFilter)
    .limit(perPage)
    .skip(perPage * page)
    .select(projection)
    .exec(function (err, stocks) {
      if (err) {
        reject(err);
      } else {
        resolve(stocks);
      }
    })
  });
}

exports.findBySymbol = (symbol, projection) => {

  const symbolFilter = {symbol: symbol, currency: 'JMD'};

  return new Promise((resolve, reject) => {
    Stock.findOne(symbolFilter)
    .select(projection)
    .exec(function (err, stocks) {
      if (err) {
        reject(err);
      } else {
        resolve(stocks);
      }
    })
  });
}