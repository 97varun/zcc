import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { PropTypes } from 'prop-types';
import TicketTitle from './TicketTitle';
import UserDetails from './UserDetails';

const Ticket = function Ticket({ ticket }) {
  return (
    <Row className="mt-3 mb-3 justify-content-center">
      <Col sm={12} md={12} lg={10} xl={10} xxl={10}>
        <Card>
          <Card.Body>
            <TicketTitle
              title={ticket.subject}
              status={ticket.status}
            />
            <Card.Text style={{ whiteSpace: 'pre-line' }}>
              {ticket.description}
            </Card.Text>
            <UserDetails
              requester={ticket.requester}
              assignee={ticket.assignee}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

Ticket.propTypes = {
  ticket: PropTypes.oneOfType([PropTypes.shape({
    subject: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    status: PropTypes.string,
    requester: PropTypes.string,
    assignee: PropTypes.string,
  })]).isRequired,
};

export default Ticket;
