const httpsClient = require('./httpsClient');
const constants = require('./constants');
const configHelper = require('./configHelper');

function getQueryString(direction, cursor) {
    queryParameters = [`page[size]=${constants.DEFAULT_NUM_TICKETS_PER_PAGE}`];

    if (direction === constants.DIRECTION_BEFORE || direction === constants.DIRECTION_AFTER) {
        queryParameters.push(`page[${direction}]=${cursor}`);
    }

    return queryParameters.join('&');
}

async function getRequestOptions(queryString) {
    return configHelper.getConfigFromEnv()
        .then(config => {
            return {
                host: `${config.subdomain}.zendesk.com`,
                path: `${constants.TICKETS_PATH}?${queryString}`,
                method: 'GET',
                auth: `${config.username}/token:${config.token}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        })
        .catch(err => {
            throw err;
        });
}

async function getTickets(direction, cursor) {
    let queryString = getQueryString(direction, cursor);
    return getRequestOptions(queryString)
        .then(options => httpsClient.getData(options))
        .then(data => JSON.parse(data))
        .catch(err => {
            throw err;
        });
}

module.exports = { getTickets };