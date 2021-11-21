const constants = require('./constants');

function getEnvVariable(name) {
    if (process.env[name]) {
        return process.env[name];
    }
    else {
        throw new Error(`Environment variable ${name} not set`);
    }
}

function getConfigFromEnv() {
    return {
        subdomain: getEnvVariable(constants.ZENDESK_SUBDOMAIN),
        username: getEnvVariable(constants.ZENDESK_USERNAME),
        token: getEnvVariable(constants.ZENDESK_API_TOKEN),
    };
}

module.exports = { getConfigFromEnv };