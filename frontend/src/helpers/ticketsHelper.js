import constants from "./constants";
import CustomPlaceholder from '../components/CustomPlaceholder';

const loadingTickets = [
    {
        id: 1,
        subject: <CustomPlaceholder height={1} width={4}/>,
        description: <CustomPlaceholder height={3} width={12}/>
    }
];

function trimNewlines(data) {
    data.tickets.forEach((ticket) => {
        ticket.description = ticket.description.trim();
    });
    return data;
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
            data = trimNewlines(data);
            setState({
                tickets: data.tickets,
                cursor: {
                    [constants.DIRECTION_BEFORE]: data?.meta?.before_cursor,
                    [constants.DIRECTION_AFTER]: data?.meta?.after_cursor
                },
                hasMore: data?.meta?.has_more,
            });
        })
        .catch((error) => {
            setState({
                tickets: [{ id: 1, subject: constants.ERROR_MESSAGE_SUBJECT, description: constants.ERROR_MESSAGE_DESCRIPTION }],
                error: error,
            });
        });
}

export { fetchTickets, loadingTickets };

