import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
import constants from '../helpers/constants';

const TicketTitle = function TicketTitle({ title, status }) {
  return (
    <Card.Title>
      {title}
      <Badge bg={constants.STATUS_BADGE_BG[status]} pill className="mx-3">{status}</Badge>
    </Card.Title>
  );
};

TicketTitle.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  status: PropTypes.string,
};

TicketTitle.defaultProps = {
  title: '',
  status: '',
};

export default TicketTitle;
