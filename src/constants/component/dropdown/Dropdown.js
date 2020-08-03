import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import React from 'react';

function Dropdown(props) {
  return (
    <Form.Group controlId={props.controlId}>
      <Form.Control
        as={props.as}
        placeholder={props.label}
        value={props.value}
        size={props.size}
        onChange={props.handleFormData}
      >
        {props.dropdownItems.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
}

Dropdown.propTypes = {
  as: PropTypes.string,
  label: PropTypes.string,
  controlId: PropTypes.string,
  value: PropTypes.any,
  size: PropTypes.string,
  handleFormData: PropTypes.func
};

export default Dropdown;
