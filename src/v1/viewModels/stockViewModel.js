const camelcaseKeys = require('camelcase-keys');
const url = require('url');

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
    const urlobj = url.parse(req.originalUrl);
    urlobj.protocol = req.protocol;
    urlobj.host = req.get('host');
    const reqUrl = new URL(url.format(urlobj));

    let pageNumber = 0;

    if (reqUrl.searchParams.has('offset')) {
      pageNumber = req.options.offset;
    } else {
      reqUrl.searchParams.append('offset', req.options.offset);
    }

    const current = reqUrl.toString();

    reqUrl.searchParams.set('offset', pageNumber + 1);
    const next = reqUrl.toString();

    reqUrl.searchParams.set('offset', pageNumber - 1);
    const previous = reqUrl.toString();

    return {
      current,
      next,
      previous,
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
      previous: {
        href: parseInt(req.options.offset, 10) > 0
        && parseInt(req.options.offset, 10) <= numberOfPages
          ? halLinks.previous : '',
      },
      current: {
        href: parseInt(req.options.offset, 10) <= numberOfPages ? halLinks.current : '',
      },
      next: {
        href: parseInt(req.options.offset, 10) < numberOfPages ? halLinks.next : '',
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
        links: getHalLinks(req, total),
        count: stocks.length,
        totalCount: total,
      };
    },
  };
}());

module.exports = StockViewModel;
