import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import React from 'react';

import GImages from './GImages';
import utils from '../../../utils/utils';

import './GImage.scss';

function GImage(props) {
  return (
    <Image
      src={utils.isDataEmpty(props.src) ? GImages.DEFAULT_IMAGE : props.src}
      roundedCircle={props.roundedCircle}
      className={props.className}
    />
  );
}

GImage.propTypes = {
  src: PropTypes.string,
  roundedCircle: PropTypes.bool,
  className: PropTypes.string
};

/* Exports ================================================================== */

export default GImage;
