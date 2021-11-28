import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

export default UserDetails;
