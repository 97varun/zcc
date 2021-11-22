const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var ticketsService = require('../ticketsService');
var httpsClient = require('../httpsClient');

let sampleTicketResponse = {
    "tickets": [
        {
            id: 1,
            subject: 'test subject',
            description: 'test description',
        },
        {
            id: 2,
            subject: 'test subject 2',
            description: 'test description 2',
        }
    ]
};

describe('ticketsService', () => {
    let saveGetData;

    before(() => {
        // Save httpsClient
        saveGetData = httpsClient.getData;

        // Environment variables
        process.env.ZENDESK_SUBDOMAIN = 'testsubdomain';
        process.env.ZENDESK_USERNAME = 'testusername';
        process.env.ZENDESK_API_TOKEN = 'testtoken';
    });

    after(() => {
        // Restore httpsClient
        httpsClient.getData = saveGetData;

        // Remove environment variables
        delete process.env.ZENDESK_SUBDOMAIN;
        delete process.env.ZENDESK_USERNAME;
        delete process.env.ZENDESK_API_TOKEN;
    });

    describe('getTickets', () => {
        it('should return tickets', () => {
            httpsClient.getData = async (options) => {
                return JSON.stringify(sampleTicketResponse);
            };

            return chai.expect(ticketsService.getTickets()).to.eventually.deep.equal(sampleTicketResponse);
        });

        it('should return error if httpClient returns an error', () => {
            const testError = JSON.stringify({ error: 'test error' });
            httpsClient.getData = async (options) => {
                throw new Error(testError);
            };

            return chai.expect(ticketsService.getTickets()).to.be.rejectedWith(testError);
        });
    });
});