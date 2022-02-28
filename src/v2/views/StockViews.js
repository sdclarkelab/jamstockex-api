function createPaginationObj(reqUrlObj, pageNumber) {
  const current = reqUrlObj.upsertQueryParam('page', pageNumber);
  const next = reqUrlObj.upsertQueryParam('page', pageNumber + 1);
  const previous = reqUrlObj.upsertQueryParam('page', pageNumber - 1);

  return {
    current,
    next,
    previous,
  };
}

/**
 * Create HAL links.
 * @param req
 * @param total
 * @returns Object
*/
function createHalLinks(paginationObj, count, limit, pageNumber) {
  const numberOfPages = (Math.ceil(count / parseInt(limit, 10))) - 1;
  const pageNumberInt = parseInt(pageNumber, 10);

  const links = {
    previous: {
      href: pageNumberInt > 0
      && pageNumberInt <= numberOfPages
        ? paginationObj.previous : '',
    },
    current: {
      href: pageNumberInt <= numberOfPages ? paginationObj.current : '',
    },
    next: {
      href: pageNumberInt < numberOfPages ? paginationObj.next : '',
    },
  };
  return links;
}

function createStocksViewModel(reqUrlObj, stocks, count, pageNumber, pageLimit) {
  const paginationObj = createPaginationObj(reqUrlObj, pageNumber);

  const halLinks = createHalLinks(paginationObj, count, pageLimit, pageNumber);

  return {
    stocks,
    links: halLinks,
    count: stocks.length,
    totalCount: count,
  };
}

module.exports = {
  createStocksViewModel,
};
