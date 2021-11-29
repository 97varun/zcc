const httpsClient = require('../helpers/httpsClient');
const constants = require('../helpers/constants');
const configHelper = require('../helpers/configHelper');

function getQueryString(direction, cursor) {
  const queryParameters = [
    'include=users',
    `page[size]=${constants.DEFAULT_NUM_TICKETS_PER_PAGE}`,
  ];

  if (direction === constants.DIRECTION_BEFORE || direction === constants.DIRECTION_AFTER) {
    queryParameters.push(`page[${direction}]=${cursor}`);
  }

  return queryParameters.join('&');
}

async function getRequestOptions(queryString) {
  return configHelper.getConfigFromEnv()
    .then((config) => ({
      host: `${config.subdomain}.zendesk.com`,
      path: `${constants.TICKETS_PATH}?${queryString}`,
      method: 'GET',
      auth: `${config.username}/token:${config.token}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    .catch((err) => {
      throw err;
    });
}

async function getUsers(ticketsResponse) {
  const users = {};

  ticketsResponse.users?.forEach((user) => {
    users[user.id] = { name: user.name };
  });

  return users;
}

async function mapTicketResponse(ticketsResponse) {
  return getUsers(ticketsResponse)
    .then((users) => ({
      tickets: ticketsResponse.tickets.map((ticket) => ({
        id: ticket.id,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        requester: users[ticket.requester_id]?.name,
        assignee: ticket.assignee_id ? users[ticket.assignee_id]?.name : '',
        createdAt: ticket.created_at,
      })),
      meta: {
        after_cursor: ticketsResponse.meta.after_cursor,
        before_cursor: ticketsResponse.meta.before_cursor,
        has_more: ticketsResponse.meta.has_more,
      },
    }))
    .catch((err) => {
      throw err;
    });
}

async function getTickets(direction, cursor) {
  const queryString = getQueryString(direction, cursor);
  return getRequestOptions(queryString)
    .then((options) => httpsClient.getData(options))
    .then((data) => JSON.parse(data))
    .then((ticketsResponse) => mapTicketResponse(ticketsResponse))
    .catch((err) => {
      throw err;
    });
}

module.exports = { getTickets };
