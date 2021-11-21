const express = require('express');
const ticketService = require('./ticketsService');

const app = express();
const port = 5000;

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

app.get('/api/tickets', (req, res) => {
    ticketService.getTickets((err, tickets) => {
        res.set(corsHeaders);
        if (err) {
            res.status(500).send('{"error": "Internal server error"}');
        }
        else {
            res.send(tickets);
        }
    });
});

app.options('*', (req, res) => {
    res.set(corsHeaders).send();
});

app.all('*', (req, res) => {
    res.set(corsHeaders).status(404).send('{"error": "Not found"}');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})