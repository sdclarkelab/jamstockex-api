require('dotenv').config();
const mongoose = require('mongoose');

const stockSchema = require('../schema/stockSchema');
const constants = require('../../../utils/constants');

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

    const dbConnectionString = process.env.DB_V2;

    function createStockModel() {
      const connection = mongoose.createConnection(dbConnectionString, options);
      return connection.model(constants.collectionName, stockSchema);
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
