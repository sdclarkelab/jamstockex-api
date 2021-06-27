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
   * @param {Object} req
   * @returns
   */
  const createHalLinks = (req) => {
    let pageNumber = 0;
    let linkUrl = '';

    if (req.originalUrl.includes('&offset=')) {
      pageNumber = req.options.pageNumber;
      linkUrl = req.headers.host + req.originalUrl;
    } else {
      linkUrl = `${req.headers.host}${req.originalUrl}&offset=${req.options.pageNumber}`;
    }

    return {
      current: linkUrl.replace(/(?<=offset=)\d+/g, pageNumber),
      next: linkUrl.replace(/(?<=offset=)\d+/g, pageNumber + 1),
      previous: linkUrl.replace(/(?<=offset=)\d+/g, pageNumber - 1),
    };
  };

  /**
   * Create HAL links.
   * @param req
   * @param total
   * @returns Object
  */
  const getHalLinks = (req, total) => {
    const numberOfPages = (Math.ceil(total / parseInt(req.options.limit, 10))) - 1;

    const halLinks = createHalLinks(req);

    const links = {
      current: {
        href: parseInt(req.options.pageNumber, 10) <= numberOfPages ? halLinks.current : '',
      },
      prev: {
        href: parseInt(req.options.pageNumber, 10) > 0
        && parseInt(req.options.pageNumber, 10) <= numberOfPages
          ? halLinks.previous : '',
      },
      next: {
        href: parseInt(req.options.pageNumber, 10) < numberOfPages ? halLinks.next : '',
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
        links: getHalLinks(req, total),
      };
    },
  };
}());

module.exports = StockViewModel;
