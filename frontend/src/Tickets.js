import React from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { constants } from "./constants";
import Pagination from "./Pagination";
import CustomPlaceholder from './CustomPlaceholder';

const loadingTickets = [
    {
        id: 1,
        subject: <CustomPlaceholder height={1} width={4}/>,
        description: <CustomPlaceholder height={3} width={12}/>
    }
];

class Tickets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: loadingTickets,
            cursor: null,
            error: null,
            page: 1,
        };
    }

    trimNewlines(data) {
        data.tickets.forEach((ticket) => {
            ticket.description = ticket.description.trim();
        });
        return data;
    }


    fetchTickets(path) {
        this.setState({
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
                data = this.trimNewlines(data);
                this.setState({
                    tickets: data.tickets,
                    cursor: {
                        [constants.DIRECTION_BEFORE]: data.meta.before_cursor,
                        [constants.DIRECTION_AFTER]: data.meta.after_cursor
                    },
                    hasMore: data.meta.has_more,
                });
            })
            .catch((error) => {
                this.setState({
                    tickets: [{ id: 1, subject: constants.ERROR_MESSAGE_SUBJECT, description: constants.ERROR_MESSAGE_DESCRIPTION }],
                    error: error,
                });
            });
    }

    componentDidMount() {
        this.fetchTickets('/api/tickets');
    }

    getPage(direction) {
        this.fetchTickets(`/api/tickets/${direction}/${this.state.cursor[direction]}`);

        let pageUpdate = 0;
        if (direction === constants.DIRECTION_AFTER) {
            pageUpdate = 1;
        } else if (direction === constants.DIRECTION_BEFORE) {
            pageUpdate = -1;
        }

        this.setState((state, props) => ({
            page: state.page + pageUpdate,
        }));
    }

    render() {
        return (
            <Container className="pt-4 mt-5 mb-5">
                <Row className="justify-content-center">
                    <Col sm={12} md={12} lg={10} xl={10} xxl={10}>
                        <h2>Tickets</h2>
                        <hr />
                    </Col>
                </Row>
                {
                    this.state.tickets.map((ticket) => {
                        return <Ticket key={ticket.id} ticket={ticket} />
                    })
                }
                {this.state.error || !this.state.tickets.length ? "" :
                    <Pagination page={this.state.page}
                        previous={this.getPage.bind(this, constants.DIRECTION_BEFORE)}
                        next={this.getPage.bind(this, constants.DIRECTION_AFTER)}
                        hasMore={this.state.hasMore} />}
            </Container>
        );
    }
}

class Ticket extends React.Component {
    render() {
        return (
            <Row className="mt-3 mb-3 justify-content-center">
                <Col sm={12} md={12} lg={10} xl={10} xxl={10}>
                    <Card>
                        <Card.Body>
                            <CardTitle
                                title={this.props.ticket.subject}
                                status={this.props.ticket.status} />
                            <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                {this.props.ticket.description}
                            </Card.Text>
                            <UserDetails
                                requester={this.props.ticket.requester}
                                assignee={this.props.ticket.assignee} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function CardTitle(props) {
    return (
        <Card.Title>
            {props.title}
            <Badge bg={constants.STATUS_BADGE_BG[props.status]} pill className="mx-3">{props.status}</Badge>
        </Card.Title>
    );
}

function UserDetails(props) {
    if (!props.requester && !props.assignee) {
        return null;
    }

    return (
        <hr />,
        <Row>
            <Col sm={6} md={6} lg={6} xl={6} xxl={6}>
                <Card.Text className="text-muted">
                    Requester: {props.requester}
                </Card.Text>
            </Col>
            <Col sm={6} md={6} lg={6} xl={6} xxl={6}>
                <Card.Text className="text-end text-muted">
                    Assignee: {props.assignee}
                </Card.Text>
            </Col>
        </Row>
    );
}

export default Tickets;