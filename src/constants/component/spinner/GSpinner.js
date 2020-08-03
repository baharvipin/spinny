import PropTypes from 'prop-types';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './GSpinner.scss';

function GSpinner(props) {
  return (
    <Spinner
      animation={props.animation ? props.animation : 'grow'}
      className={props.className ? props.className : 'medium'}
    />
  );
}

GSpinner.propTypes = {
  animation: PropTypes.string,
  className: PropTypes.string
};

/* Exports ================================================================== */

export default GSpinner;
