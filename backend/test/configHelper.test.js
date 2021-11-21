const chai = require('chai');
var configHelper = require('../configHelper');

describe('configHelper', () => {
    afterEach(() => {
        // Remove environment variables
        delete process.env.ZENDESK_SUBDOMAIN;
        delete process.env.ZENDESK_USERNAME;
        delete process.env.ZENDESK_API_TOKEN;
    });

    describe('getConfigFromEnv', () => {
        it('should return correct config when env variables are set', () => {
            process.env.ZENDESK_SUBDOMAIN = 'testsubdomain';
            process.env.ZENDESK_USERNAME = 'testusername';
            process.env.ZENDESK_API_TOKEN = 'testtoken';

            let config = configHelper.getConfigFromEnv();

            chai.expect(config).to.deep.equal({
                subdomain: 'testsubdomain',
                username: 'testusername',
                token: 'testtoken',
            });
        });

        it('should throw error when env variables are not set', () => {
            chai.expect(() => {
                configHelper.getConfigFromEnv();
            }).to.throw('Environment variable ZENDESK_SUBDOMAIN not set');

            chai.expect(() => {
                process.env.ZENDESK_SUBDOMAIN = 'testsubdomain';
                configHelper.getConfigFromEnv();
            }).to.throw('Environment variable ZENDESK_USERNAME not set');

            chai.expect(() => {
                process.env.ZENDESK_SUBDOMAIN = 'testsubdomain';
                process.env.ZENDESK_USERNAME = 'testusername';
                configHelper.getConfigFromEnv();
            }).to.throw('Environment variable ZENDESK_API_TOKEN not set');
        });
    });
});