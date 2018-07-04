import React from 'react';
import PropTypes from 'prop-types';
import { FullWidthButton } from '../shared-components/common';

export const SaveUpdateBtn = (props) => {
  const { clicked } = props;
  return (
    <FullWidthButton type="primary" onClick={clicked}>
      {'Save Update'}
    </FullWidthButton>
  );
};
SaveUpdateBtn.propTypes = { clicked: PropTypes.func.isRequired };

export const a = 2;
