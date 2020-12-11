import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({
  placeholder,
  required = true,
  value,
  type = "number",
  className
}) => (
  <Container
    className={className}
    placeholder={placeholder}
    required={required}
    value={value}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.number.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number.isRequired,
  type: PropTypes.string
};

export default Input;