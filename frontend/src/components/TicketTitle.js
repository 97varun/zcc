import React from "react";
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import constants from "../helpers/constants";

function TicketTitle(props) {
    return (
        <Card.Title>
            {props.title}
            <Badge bg={constants.STATUS_BADGE_BG[props.status]} pill className="mx-3">{props.status}</Badge>
        </Card.Title>
    );
}

export default TicketTitle;
