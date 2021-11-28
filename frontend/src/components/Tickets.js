import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import constants from "../helpers/constants";
import Pagination from "./Pagination";
import Ticket from "./Ticket";
import { fetchTickets, loadingTickets } from "../helpers/ticketsHelper";
import { updatePage } from "../helpers/pageHelper";

class Tickets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: loadingTickets,
            cursor: null,
            error: null,
            page: 1,
        };

        this.customSetState = function (newState) {
            this.setState(newState);
        }.bind(this);
    }

    componentDidMount() {
        fetchTickets('/api/tickets', this.customSetState);
    }

    getPage(direction) {
        fetchTickets(`/api/tickets/${direction}/${this.state.cursor[direction]}`, this.customSetState);
        updatePage(direction, this.customSetState);
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

export default Tickets;