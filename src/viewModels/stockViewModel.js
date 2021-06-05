const camelcaseKeys = require('camelcase-keys');

const StockViewModel = (function () {
  // ************** Private Functions **************

  /**
   * Convert object keys to camel case.
   * @param [stock] stocks
   * @returns [stocks]
  */
  const convertKeysToCamelCase = (result) => camelcaseKeys(result, { deep: true });

  /**
   * Create HAL links.
   * @param req
   * @returns Object
  */
  const createHalLinks = (req) => {
    const links = {
      current: {
        href: req.headers.host + req.originalUrl,
      },
      prev: {
        href: req.headers.host + req.originalUrl,
      },
      next: {
        href: req.headers.host + req.originalUrl,
      },
    };
    return links;
  };

  // ************** Public Functions **************
  return {
    createStockViewModel: (result) => {
      const stock = convertKeysToCamelCase(result);
      return stock;
    },

    createStocksViewModel: (req, results, total) => {
      const stocks = convertKeysToCamelCase(results);

      return {
        stocks,
        results: stocks.length,
        total,
        links: createHalLinks(req),
      };
    },
  };
}());

module.exports = StockViewModel;
