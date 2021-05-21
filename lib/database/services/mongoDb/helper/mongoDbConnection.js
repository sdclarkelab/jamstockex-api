require('dotenv').config();
const mongoose = require('mongoose');

const StockSchema = require('../models/StockModel');

const mongoDbConnection = (() => {
  let instance;

  function init() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
    };

    const dbConnectionString = process.env.DB;

    function createStockModel() {
      StockSchema.virtual('id').get(function convertHexToString() {
        return this._id.toHexString();
      });

      // Ensure virtual fields are serialised.
      StockSchema.set('toJSON', {
        virtuals: true,
      });

      const connection = mongoose.createConnection(dbConnectionString, options);
      return connection.model('stock', StockSchema);
    }

    return {
      getStockModel() {
        return createStockModel();
      },
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }

      return instance;
    },
  };
})();

module.exports = mongoDbConnection.getInstance();
