import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { PropTypes } from 'prop-types';

const Pagination = function Pagination({
  page, previous, next, hasMore,
}) {
  return (
    <Row className="justify-content-center text-center align-items-center">
      <Col xs={3} sm={3} md={3} lg={2} xl={2} xxl={2}>
        <Button
          disabled={page === 1}
          onClick={previous}
          className="w-100"
          variant="dark"
        >
          Previous

        </Button>
      </Col>
      <Col className="" xs={6} sm={4} md={4} lg={6} xl={6} xxl={6}>
        <p className="h-100 m-0">{`Page ${page}`}</p>
      </Col>
      <Col xs={3} sm={3} md={3} lg={2} xl={2} xxl={2}>
        <Button
          disabled={!hasMore}
          onClick={next}
          className="w-100"
          variant="dark"
        >
          Next

        </Button>
      </Col>
    </Row>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default Pagination;
