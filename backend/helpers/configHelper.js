const constants = require('./constants');

async function getEnvVariable(name) {
  if (process.env[name]) {
    return process.env[name];
  }

  throw new Error(`Environment variable ${name} not set`);
}

async function getConfigFromEnv() {
  return Promise.all([
    getEnvVariable(constants.ZENDESK_SUBDOMAIN),
    getEnvVariable(constants.ZENDESK_USERNAME),
    getEnvVariable(constants.ZENDESK_API_TOKEN),
  ])
    .then((values) => ({
      subdomain: values[0],
      username: values[1],
      token: values[2],
    }))
    .catch((err) => {
      throw err;
    });
}

module.exports = { getConfigFromEnv };
