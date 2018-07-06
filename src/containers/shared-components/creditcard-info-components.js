import React from 'react';
import PropTypes from 'prop-types';
// to ignore the warnings: Statless functions can't be givien refs.
import { toClass } from 'recompose';
import { Input, DatePicker } from 'antd';
import { monthFormat, extraInfoStyles } from './common';
import { fieldWidth } from './member-info-components';

const { MonthPicker } = DatePicker;

// ******************************* credinfo-form components
// *******************************
export const cardExpInput = (
  <MonthPicker style={fieldWidth} format={monthFormat} placeholder="Select month and year" />
);
export const CardNumInput = toClass((props) => {
  const { blurred } = props;
  return <Input maxLength="16" type="text" style={fieldWidth} onBlur={blurred} />;
});
CardNumInput.propTypes = { blurred: PropTypes.func.isRequired };

export const cardNumInfo = (
  <span style={extraInfoStyles}>
    {'Do not include space or dashes "-".'}
  </span>
);

export const cardExpInfo = (
  <span style={extraInfoStyles}>
    {'MM-YYYY'}
  </span>
);
export const CardSecInput = toClass((props) => {
  const { blurred } = props;
  return <Input maxLength="4" type="text" style={fieldWidth} onBlur={blurred} />;
});
CardSecInput.propTypes = { blurred: PropTypes.func.isRequired };
// end
