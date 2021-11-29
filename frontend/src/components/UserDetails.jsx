import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

const UserDetails = function UserDetails({ requester, assignee }) {
  if (!requester && !assignee) {
    return null;
  }

  return (
    <hr />,
      <Row>
        <Col sm={6} md={6} lg={6} xl={6} xxl={6}>
          <Card.Text className="text-muted">
            Requester:
            {' '}
            {requester}
          </Card.Text>
        </Col>
        <Col sm={6} md={6} lg={6} xl={6} xxl={6}>
          <Card.Text className="text-end text-muted">
            Assignee:
            {' '}
            {assignee}
          </Card.Text>
        </Col>
      </Row>
  );
};

UserDetails.propTypes = {
  requester: PropTypes.string,
  assignee: PropTypes.string,
};

UserDetails.defaultProps = {
  requester: '',
  assignee: '',
};

export default UserDetails;
