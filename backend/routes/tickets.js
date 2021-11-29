const express = require('express');
const constants = require('../helpers/constants');
const ticketService = require('../services/ticketsService');

const router = express.Router();

router.get('/', (req, res) => {
  ticketService.getTickets()
    .then((tickets) => {
      res.status(200).send(JSON.stringify(tickets));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(JSON.stringify(constants.INTERNAL_ERROR_MESSAGE));
    });
});

router.get('/:direction/:cursor', (req, res) => {
  const { direction } = req.params;
  const { cursor } = req.params;

  if (direction !== constants.DIRECTION_BEFORE && direction !== constants.DIRECTION_AFTER) {
    res.status(400).send(JSON.stringify(constants.INVALID_DIRECTION_MESSAGE));
  } else {
    ticketService.getTickets(direction, cursor)
      .then((tickets) => {
        res.status(200).send(JSON.stringify(tickets));
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(JSON.stringify(constants.INTERNAL_ERROR_MESSAGE));
      });
  }
});

module.exports = router;
