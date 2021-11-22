const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var ticketsService = require('../ticketsService');
var httpsClient = require('../httpsClient');
const constants = require('../constants');

const sampleTicketResponseCurrPage = {
    "tickets": [
        {
            id: 3,
            subject: 'test subject 3',
            description: 'test description 3',
        },
        {
            id: 4,
            subject: 'test subject 4',
            description: 'test description 4',
        }
    ]
};

const sampleTicketResponsePrevPage = {
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
    ],
};

const sampleTicketResponseNextPage = {
    "tickets": [
        {
            id: 5,
            subject: 'test subject 5',
            description: 'test description 5',
        },
        {
            id: 6,
            subject: 'test subject 6',
            description: 'test description 6',
        }
    ]
};

const testError = JSON.stringify({ error: 'test error' });

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
                return JSON.stringify(sampleTicketResponseCurrPage);
            };

            return chai.expect(ticketsService.getTickets()).to.eventually.deep.equal(sampleTicketResponseCurrPage);
        });

        it('should return error if httpClient returns an error', () => {
            httpsClient.getData = async (options) => {
                throw new Error(testError);
            };

            return chai.expect(ticketsService.getTickets()).to.be.rejectedWith(testError);
        });

        it('should get next page of tickets', () => {
            httpsClient.getData = async (options) => {
                if (options.path.includes('invalidcursor')) {
                    throw new Error(testError);
                }
                else if (options.path.includes('after') && options.path.includes('testcursor1')) {
                    return JSON.stringify(sampleTicketResponseNextPage);
                }
                else if (options.path.includes('before') && options.path.includes('testcursor2')) {
                    return JSON.stringify(sampleTicketResponsePrevPage);
                }
                else {
                    return JSON.stringify(sampleTicketResponseCurrPage);
                }
            };

            return chai.expect(ticketsService.getTickets(constants.DIRECTION_AFTER, 'testcursor1')).to.eventually.deep.equal(sampleTicketResponseNextPage);
        });

        it('should get previous page of tickets', () => {
            return chai.expect(ticketsService.getTickets(constants.DIRECTION_BEFORE, 'testcursor2')).to.eventually.deep.equal(sampleTicketResponsePrevPage);
        });

        it('should return error for invalid cursor', () => {
            return chai.expect(ticketsService.getTickets(constants.DIRECTION_BEFORE, 'invalidcursor')).to.be.rejectedWith(testError);
        });
    });
});