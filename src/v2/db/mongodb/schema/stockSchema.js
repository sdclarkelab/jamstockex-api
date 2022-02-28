const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const constants = require('../../../utils/constants');

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
    instrument_details_url: {
      type: String,
    },
    corporate_action: {
      dividend: [
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
          last_updated_date: {
            type: Schema.Types.Mixed,
            required: true,
          },
        },
      ],
    },
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
      last_updated_date: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
  },
  { collection: constants.collectionName },
);

module.exports = stockSchema;
