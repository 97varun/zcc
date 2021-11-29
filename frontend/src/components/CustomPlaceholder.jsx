import React from 'react';
import { PropTypes } from 'prop-types';

import Placeholder from 'react-bootstrap/Placeholder';

const CustomPlaceholder = function CustomPlaceholder(props) {
  const { width } = props;
  const { height } = props;
  const placeholderBlock = Array.from(Array(height).keys()).map((key) => ({
    id: key,
  }));

  return (
    <>
      {placeholderBlock.map((row) => <PlaceholderRow key={row.id} width={width} />)}
    </>
  );
};

CustomPlaceholder.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const PlaceholderRow = function PlaceholderRow(props) {
  const { width } = props;

  return (
    <Placeholder animation="glow">
      <Placeholder xs={width} />
    </Placeholder>
  );
};

PlaceholderRow.propTypes = {
  width: PropTypes.number.isRequired,
};

export default CustomPlaceholder;
