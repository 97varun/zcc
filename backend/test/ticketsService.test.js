const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var ticketsService = require('../services/ticketsService');
var httpsClient = require('../helpers/httpsClient');
const constants = require('../helpers/constants');
const testTicketsData = require('./testTicketsData');

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
                return JSON.stringify(testTicketsData.sampleTicketResponseCurrPage);
            };

            return chai.expect(ticketsService.getTickets()).to.eventually.deep.equal(testTicketsData.sampleTicketResponseCurrPageMapped);
        });

        it('should return error if httpClient returns an error', () => {
            httpsClient.getData = async (options) => {
                throw new Error(testTicketsData.testError);
            };

            return chai.expect(ticketsService.getTickets()).to.be.rejectedWith(testTicketsData.testError);
        });

        it('should get next page of tickets', () => {
            httpsClient.getData = async (options) => {
                if (options.path.includes('invalidcursor')) {
                    throw new Error(testTicketsData.testError);
                }
                else if (options.path.includes('after') && options.path.includes('testcursor1')) {
                    return JSON.stringify(testTicketsData.sampleTicketResponseNextPage);
                }
                else if (options.path.includes('before') && options.path.includes('testcursor2')) {
                    return JSON.stringify(testTicketsData.sampleTicketResponsePrevPage);
                }
                else {
                    return JSON.stringify(testTicketsData.sampleTicketResponseCurrPage);
                }
            };

            return chai.expect(ticketsService.getTickets(constants.DIRECTION_AFTER, 'testcursor1')).to.eventually.deep.equal(testTicketsData.sampleTicketResponseNextPageMapped);
        });

        it('should get previous page of tickets', () => {
            return chai.expect(ticketsService.getTickets(constants.DIRECTION_BEFORE, 'testcursor2')).to.eventually.deep.equal(testTicketsData.sampleTicketResponsePrevPageMapped);
        });

        it('should return error for invalid cursor', () => {
            return chai.expect(ticketsService.getTickets(constants.DIRECTION_BEFORE, 'invalidcursor')).to.be.rejectedWith(testTicketsData.testError);
        });
    });
});