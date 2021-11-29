import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import constants from '../helpers/constants';
import Pagination from './Pagination';
import Ticket from './Ticket';
import { fetchTickets } from '../helpers/ticketsHelper';
import loadingTickets from './LoadingTickets';
import updatePage from '../helpers/pageHelper';

class Tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: loadingTickets,
      cursor: null,
      error: null,
      page: 1,
      hasMore: false,
    };

    this.customSetState = function customSetState(newState) {
      this.setState(newState);
    }.bind(this);

    this.getNextPage = this.getPage.bind(this, constants.DIRECTION_AFTER);
    this.getPreviousPage = this.getPage.bind(this, constants.DIRECTION_BEFORE);
  }

  componentDidMount() {
    fetchTickets('/api/tickets', this.customSetState);
  }

  getPage(direction) {
    const { cursor } = this.state;
    fetchTickets(`/api/tickets/${direction}/${cursor[direction]}`, this.customSetState);
    updatePage(direction, this.customSetState);
  }

  getTickets() {
    const { tickets } = this.state;
    return tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />);
  }

  getPagination() {
    const {
      error, tickets, page, hasMore,
    } = this.state;

    return error || !tickets.length ? ''
      : (
        <Pagination
          page={page}
          previous={this.getPreviousPage}
          next={this.getNextPage}
          hasMore={hasMore}
        />
      );
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
        {this.getTickets()}
        {this.getPagination()}
      </Container>
    );
  }
}

export default Tickets;
