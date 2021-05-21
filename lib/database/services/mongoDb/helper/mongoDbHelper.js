const camelcaseKeys = require('camelcase-keys');

/**
 * Convert object keys to camel case.
 * @param [stock] stocks
 * @returns [stocks]
 */
function convertKeysToCamelCase(stocks) {
  return camelcaseKeys(stocks, { deep: true });
}

module.exports = { convertKeysToCamelCase };
