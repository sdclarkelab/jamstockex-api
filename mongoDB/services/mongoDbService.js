require('dotenv').config();
const mongoose = require('mongoose');
const DbConnection = require('./dbConnection');

const dbConnection = new DbConnection().getInstance();
const { Schema } = dbConnection.getConnection();

// Use observer pattern

function mongoDbService() {
  // Set Mongoose Schema
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
    return this._id.toHexString();
  });

  // Ensure virtual fields are serialized.
  stockSchema.set('toJSON', {
    virtuals: true,
  });

  // Export stock model
  const Stock = mongoose.model('stock', stockSchema);

  let count = 0;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
  };

  const connectWithRetry = () => {
    console.log('Establishing MongoDB connection ...');

    mongoose.connect(process.env.DB, options).then(() => {
      console.log('MongoDB is connected');
    }).catch((err) => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', count += 1);
      setTimeout(connectWithRetry, 5000);
    });
  };

  return {

  };
}
