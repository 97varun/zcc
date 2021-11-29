module.exports = {
  CORS_HEADERS: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  },

  DEFAULT_NUM_TICKETS_PER_PAGE: 25,

  ZENDESK_SUBDOMAIN: 'ZENDESK_SUBDOMAIN',
  ZENDESK_USERNAME: 'ZENDESK_USERNAME',
  ZENDESK_API_TOKEN: 'ZENDESK_API_TOKEN',

  TICKETS_PATH: '/api/v2/tickets.json',

  DIRECTION_BEFORE: 'before',
  DIRECTION_AFTER: 'after',

  INTERNAL_ERROR_MESSAGE: {
    error: 'Internal Server Error',
  },
  INVALID_ROUTE_MESSAGE: {
    error: 'Invalid Route',
  },
  INVALID_DIRECTION_MESSAGE: {
    error: 'Invalid Direction. Allowed directions are [before, after]',
  },
};
