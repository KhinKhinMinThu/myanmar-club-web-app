import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Button, Input, Card,
} from 'antd';
import styled from 'styled-components';

// to remove after refactoring signup/profile
export const dateFormat = 'DD-MM-YYYY';
export const monthFormat = 'MM-YYYY';
export const fieldWidth = { width: 200 };
// end

export const FormInputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;
export const CustomIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const PageCard = styled(Card)`
  height: 100vh;
  width: 1300px;
  min-width: 1300px;
  padding: 20px 5px 5px;
`;

// to remove after refactoring signup/profile
export const BtnWithOnClick = (props) => {
  const { clicked, text } = props;
  return (
    <FullWidthButton type="primary" onClick={clicked}>
      {text}
    </FullWidthButton>
  );
};
BtnWithOnClick.propTypes = {
  clicked: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
// end

// to remove after refactoring signup/profile
export const BackBtn = (props) => {
  const { clicked } = props;
  return <FullWidthButton onClick={clicked}>Back</FullWidthButton>;
};
BackBtn.propTypes = { clicked: PropTypes.func.isRequired };
// end

// to remove after refactoring signup/profile
export const blankInput = <Input style={fieldWidth} type="text" />;
export const InputWithText = (props) => {
  const { text } = props;
  return <Input style={fieldWidth} type="text" placeholder={text} />;
};
InputWithText.propTypes = { text: PropTypes.string.isRequired };
// end

// to remove after refactoring signup/profile
export const pageStyles = {
  width: 1300,
  minWidth: 1300,
  padding: '20px 5px 5px',
  borderRadius: 10,
  top: '5%',
  marginLeft: 'auto',
  marginRight: 'auto',
};

export const extraInfoStyles = {
  color: 'rgba(0, 0, 0, 0.4)',
  fontStyle: 'italic',
  marginLeft: 8,
};

export const radioStyle = {
  paddingTop: 6,
  display: 'block',
  lineHeight: 2,
};
// end
