import React from 'react';
import moment from 'moment-timezone';
import {
  Form, DatePicker, Row, Col,
} from 'antd';
import {
  layout,
  inputLayout1,
  inputLayout2,
  customInput,
} from './shared-components';
import { TIMEZONE, DATE_FORMAT } from '../../actions/constants';

const FormItem = Form.Item;
/* eslint react/prop-types: 0 */

// ***** set endDate if endDate < startDate
// ***** reset startTime & endTime
const onChangeStartDate = ({ value, endDate, setFields }) => {
  const shouldSetDate = endDate ? endDate < value : true;
  if (shouldSetDate) setFields({ endDate: { value } });
  if (!value) setFields({ endDate: { value } });
};

// Submitted Start Date
const SubmittedDatePicker = ({ decorator, getFieldValue, setFields }) => {
  const endDate = getFieldValue('endDate')
    ? moment.tz(new Date(getFieldValue('endDate')), TIMEZONE)
    : null;

  const disabledStartDate = current => current < moment().startOf('day'); // disabled date before today .add(0, 'days')

  const startDate = getFieldValue('startDate')
    ? moment.tz(new Date(getFieldValue('startDate')), TIMEZONE)
    : null;

  const disabledEndDate = current => (startDate ? current < startDate : false); // disabled date before start date

  return (
    <FormItem {...layout} label="Submitted Date" colon>
      <Row type="flex" justify="start">
        <Col {...inputLayout1}>
          <FormItem>
            {decorator('startDate')(
              <DatePicker
                {...customInput}
                format={DATE_FORMAT}
                disabledDate={disabledStartDate}
                onChange={value => onChangeStartDate({
                  value,
                  endDate,
                  setFields,
                })
                }
              />,
            )}
          </FormItem>
        </Col>
        <Col {...inputLayout2}>
          <FormItem>
            {decorator('endDate')(
              <DatePicker
                {...customInput}
                format={DATE_FORMAT}
                disabledDate={disabledEndDate}
                disabled={!startDate}
              />,
            )}
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  );
};

export default SubmittedDatePicker;
