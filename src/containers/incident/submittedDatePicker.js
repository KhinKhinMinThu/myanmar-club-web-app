import React from 'react';
import moment from 'moment-timezone';
import { Form, DatePicker } from 'antd';
import { layout, customInput } from './shared-components';
import { TIMEZONE, DATE_FORMAT } from '../../actions/constants';

const FormItem = Form.Item;
/* eslint react/prop-types: 0 */

// Submitted Start Date
const SubmittedDatePicker = ({ decorator, getFieldValue }) => {
  const startDate = getFieldValue('startDate')
    ? moment.tz(new Date(getFieldValue('startDate')), TIMEZONE)
    : null;

  const disabledEndDate = current => (startDate ? current < startDate : false); // disabled date before start date

  return (
    <div>
      <FormItem {...layout} label="Submitted Date" colon>
        {decorator('startDate')(
          <DatePicker
            {...customInput}
            format={DATE_FORMAT}
            placeholder="From date"
          />,
        )}
      </FormItem>
      <FormItem {...layout} label=" " colon={false} style={{ marginBottom: 0 }}>
        {decorator('endDate')(
          <DatePicker
            {...customInput}
            format={DATE_FORMAT}
            placeholder="To date"
            disabledDate={disabledEndDate}
            disabled={!startDate}
          />,
        )}
      </FormItem>
    </div>
  );
};

export default SubmittedDatePicker;
