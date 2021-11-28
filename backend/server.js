const express = require('express');
const constants = require('./helpers/constants');
const tickets = require('./routes/tickets');

const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const app = express();
const port = 5000;

// Set cors headers for all responses
app.use(function (req, res, next) {
    res.set(constants.CORS_HEADERS);
    next();
});

app.use('/api/tickets', tickets);

app.options('*', (req, res) => {
    res.send();
});

app.all('*', (req, res) => {
    res.status(404).send(JSON.stringify(constants.INVALID_ROUTE_MESSAGE));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})