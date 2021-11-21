import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { constants } from "./constants";
import Pagination from "./Pagination";

class Tickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            cursor: null,
            error: null,
        };
    }

    componentDidMount() {
        fetch(`${constants.HOST}/api/tickets`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(constants.ERROR_MESSAGE_DESCRIPTION);
            })
            .then((data) => {
                this.setState({
                    tickets: data.tickets,
                    cursor: data.cursor,
                });
            })
            .catch((error) => {
                this.setState({
                    tickets: [{id: 1, subject: constants.ERROR_MESSAGE_SUBJECT, description: error.message}],
                    error: error,
                });
            });
    }

    render() {
        return (
            <Container className="pt-4 mt-5 mb-5">
                <Row key="yzn" className="justify-content-center">
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
                {this.state.error ? "" : <Pagination key="xyz" title="Page 1" />}
            </Container>
        );
    }
}

class Ticket extends React.Component {
    render() {
        return (
            <Row className="mt-2 mb-2 justify-content-center">
                <Col sm={12} md={12} lg={10} xl={10} xxl={10}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{this.props.ticket.subject}</Card.Title>
                            <Card.Text style={{ whiteSpace: 'pre-line' }}>{this.props.ticket.description.trim()}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Tickets;