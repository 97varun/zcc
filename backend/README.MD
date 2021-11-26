The backend is implemented in Node.js using the Express framework.

There are a few layers in the backend.
- The [server](/server.js) where the requests land.
- The [tickets](./tickets.js) route where requests that come to /ticket are handled.
- The [ticketService](/ticketService) which deals with tickets.
- The [httpsClient](/httpsClient.js) which makes requests to the Zendesk API.

There are a few [unit tests](/test/ticketService.test.js) to test the functionality of ticketService.