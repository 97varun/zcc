## Setup instructions

First clone the repository and make sure [Node.js](https://nodejs.org/en/) and npm are installed.

## Start the backend server

Configure values for the auth settings in the .env file in the backend folder.

```
ZENDESK_USERNAME=email
ZENDESK_SUBDOMAIN=subdomain
ZENDESK_API_TOKEN=apitoken
```
Then, install the dependencies and start the server.
```
cd backend
npm install
npm start
```
Now the server should be available at http://localhost:5000/.

To test if it is up, try to access `/api/tickets` from a browser or another client.

## Launch the frontend

Install dependencies and start the development server
```
cd frontend
npm install
npm start
```
If everything went well, the frontend should be available at http://localhost:3000/.

### Brief design description

- [Backend](/backend/README.md)
- [Frontend](/frontend/README.md)