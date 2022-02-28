const _ = require('lodash');

function createExistQuery(fieldName) {
  return {
    [fieldName]: {
      $exists: true,
    },
  };
}

function createValueQuery(fieldName, value) {
  return {
    [fieldName]: value,
  };
}

function createInArrayQuery(fieldName, array) {
  return {
    [fieldName]: {
      $in: array,
    },
  };
}

function serializeFilter(filters) {
  return {
    ...!_.isEmpty(filters.hasDividend) && _.get(filters, 'hasDividend') === 'true' && createExistQuery('corporate_action.dividend'),
    ...!_.isEmpty(filters.market) && createValueQuery('market', filters.market),
    ...!_.isEmpty(filters.type) && createValueQuery('type', filters.type),
    ...!_.isEmpty(filters.currency) && createValueQuery('currency', filters.currency),
    ...!_.isEmpty(filters.symbols) && createInArrayQuery('symbol', filters.symbols.replace(/\s/g, '').split(',')),
  };
}

function serializeField(fieldName, value) {
  return createValueQuery(fieldName, value);
}

function serializeArrayString(arrayString) {
  return arrayString.replace(',', ' ');
}

module.exports = {
  serializeFilter,
  serializeField,
  serializeArrayString,
};
