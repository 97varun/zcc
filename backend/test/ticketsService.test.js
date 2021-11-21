var ticketsService = require('../ticketsService');
var httpsClient = require('../httpsClient');
const chai = require('chai');

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
        it('should return tickets', (done) => {
            httpsClient.getData = (options, callback) => {
                callback(null, JSON.stringify(sampleTicketResponse));
            };

            ticketsService.getTickets((err, data) => {
                chai.expect(err).to.be.null;
                chai.expect(data).to.deep.equal(sampleTicketResponse);
                done();
            });
        });

        it('should return error if httpClient returns an error', (done) => {
            httpsClient.getData = (options, callback) => {
                callback("{'error': 'test error'}", null);
            };

            ticketsService.getTickets((err, data) => {
                chai.expect(err).to.be.a('string');
                done();
            });
        });
    });
});