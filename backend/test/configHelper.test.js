const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var configHelper = require('../helpers/configHelper');

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

            chai.expect(configHelper.getConfigFromEnv()).to.eventually.deep.equal({
                subdomain: 'testsubdomain',
                username: 'testusername',
                token: 'testtoken',
            });
        });

        it('should throw error when env variables are not set', () => {
            return chai.expect(configHelper.getConfigFromEnv()).to.be.rejectedWith('Environment variable ZENDESK_SUBDOMAIN not set');
        });
    });
});