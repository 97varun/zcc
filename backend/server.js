const express = require('express');
const constants = require('./constants');
const ticketService = require('./ticketsService');

const app = express();
const port = 5000;

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

app.get('/api/tickets', (req, res) => {
    res.set(corsHeaders);
    ticketService.getTickets()
        .then(tickets => {
            res.status(200).send(JSON.stringify(tickets));
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(JSON.stringify(constants.INTERNAL_ERROR_MESSAGE));
        });
});

app.get('/api/tickets/:direction/:cursor', (req, res) => {
    const direction = req.params.direction;
    const cursor = req.params.cursor;

    res.set(corsHeaders);
    if (direction !== constants.DIRECTION_BEFORE && direction !== constants.DIRECTION_AFTER) {
        res.status(400).send(JSON.stringify(constants.INVALID_DIRECTION_MESSAGE));
    }
    else {
        ticketService.getTickets(direction, cursor)
            .then(ticket => {
                res.status(200).send(JSON.stringify(ticket));
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(JSON.stringify(constants.INTERNAL_ERROR_MESSAGE));
            });
    }
});

app.options('*', (req, res) => {
    res.set(corsHeaders).send();
});

app.all('*', (req, res) => {
    res.set(corsHeaders).status(404).send(JSON.stringify(constants.INVALID_ROUTE_MESSAGE));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})