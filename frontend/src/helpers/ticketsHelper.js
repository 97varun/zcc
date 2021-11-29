import constants from './constants';
import loadingTickets from '../components/LoadingTickets';

function trimNewlines(data) {
  const trimmedTickets = data.tickets.map(
    (ticket) => ({ description: ticket.description.trim(), ...ticket }),
  );

  return { tickets: trimmedTickets, ...data };
}

function fetchTickets(path, setState) {
  setState({
    tickets: loadingTickets,
    error: null,
  });

  fetch(`${constants.HOST}${path}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.ERROR_MESSAGE_DESCRIPTION);
    })
    .then((data) => {
      const trimmedData = trimNewlines(data);
      setState({
        tickets: trimmedData.tickets,
        cursor: {
          [constants.DIRECTION_BEFORE]: data.meta.before_cursor,
          [constants.DIRECTION_AFTER]: data.meta.after_cursor,
        },
        hasMore: data.meta.has_more,
      });
    })
    .catch((error) => {
      setState({
        tickets: [{
          id: 1,
          subject: constants.ERROR_MESSAGE_SUBJECT,
          description: constants.ERROR_MESSAGE_DESCRIPTION,
        }],
        error,
      });
    });
}

export { fetchTickets, loadingTickets };
