import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from './Button'

const Container = Button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const reqButton = ({ text, onClick }) => (
    <Container onClick={onClick}>{text}</Container>
  );
  
  reqButton.propTypes = {
    text: PropTypes.string.isRequired
  };
  
  export default reqButton;