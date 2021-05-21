const mongoDbService = require('../service/service');
const convertKeysToCamelCase = require('../viewModel');

async function mongoDbController(action, data = null) {
  let response;

  if (action === 'getStocks') response = getStocks(filter);
  if (action === 'getStock') response = getStock(filter);

  return response.then((res) => convertKeysToCamelCase(res));
}
