const httpsClient = require('./httpsClient');
const constants = require('./constants');
const configHelper = require('./configHelper');

function getTickets(callback) {
    let config = null;
    try {
        config = configHelper.getConfigFromEnv();

        options = {
            host: `${config.subdomain}.zendesk.com`,
            path: '/api/v2/tickets.json?' + `page[size]=${constants.NUM_TICKETS_PER_PAGE}`,
            method: 'GET',
            auth: `${config.username}/token:${config.token}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        httpsClient.getData(options, (err, data) => {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, JSON.parse(data));
            }
        });
    }
    catch (err) {
        callback(err, null);
    }
}

module.exports = { getTickets };