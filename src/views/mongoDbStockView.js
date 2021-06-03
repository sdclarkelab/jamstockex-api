const camelcaseKeys = require('camelcase-keys');

const stockViewModel = (() => {
  /**
   * Convert object keys to camel case.
   * @param [stock] stocks
   * @returns [stocks]
   */
  function convertKeysToCamelCase(mongoDbStockData) {
    return camelcaseKeys(mongoDbStockData, { deep: true });
  }

  return {
    createStockViewModel(mongoDbStockData) {
      const stocks = convertKeysToCamelCase(mongoDbStockData);
      return {
        stocks,
        total: stocks.length,
      };
    },
  };
})();

module.exports = stockViewModel;
