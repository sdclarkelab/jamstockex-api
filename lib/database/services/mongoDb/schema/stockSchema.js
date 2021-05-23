const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    last_updated_date: {
      type: Schema.Types.Mixed,
      required: true,
    },
    instrument_name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    is_listed: {
      type: Boolean,
      required: true,
    },
    market: {
      type: String,
      required: true,
    },
    corporate_action_url: {
      type: String,
    },
    dividends: [
      {
        amount: {
          type: Number,
        },
        payment_date: {
          type: Date,
        },
        execution_date: {
          type: Date,
        },
        record_date: {
          type: Date,
        },
      },
    ],
    trade_info: {
      volume_traded: {
        type: Number,
      },
      dollar_change: {
        type: Number,
      },
      market_price: {
        type: Number,
      },
      percentage_change: {
        type: Number,
      },
    },
  },
  { collection: 'stock' },
);

stockSchema.virtual('id').get(function convertHexToString() {
  return this._id.toString();
});

// Now, the `lowercase` property will show up even if you do a lean query
stockSchema.plugin(mongooseLeanVirtuals);

module.exports = stockSchema;
