const express = require('express');
const constants = require('./constants');
const tickets = require('./tickets');

const app = express();
const port = 5000;

app.use('/api/tickets', tickets);

app.options('*', (req, res) => {
    res.set(constants.CORS_HEADERS).send();
});

app.all('*', (req, res) => {
    res.status(404).send(JSON.stringify(constants.INVALID_ROUTE_MESSAGE));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})