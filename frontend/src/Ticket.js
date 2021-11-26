import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TicketTitle from "./TicketTitle";
import UserDetails from "./UserDetails";

class Ticket extends React.Component {
    render() {
        return (
            <Row className="mt-3 mb-3 justify-content-center">
                <Col sm={12} md={12} lg={10} xl={10} xxl={10}>
                    <Card>
                        <Card.Body>
                            <TicketTitle
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

export default Ticket;
