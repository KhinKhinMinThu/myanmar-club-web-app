import React from 'react';
import moment from 'moment-timezone';
import {
  Form, DatePicker, TimePicker, Row, Col,
} from 'antd';
import { layoutHalf, customInput } from './shared-components';
import { TIMEZONE, DATE_FORMAT, TIME_FORMAT } from '../../actions/constants';

const FormItem = Form.Item;

/* eslint react/prop-types: 0 */

// ***** time range for DateTimePicker
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(i);
  }
  return result;
};

// ***** check if two dates are the same
const isSameDate = (moment1, moment2) => (moment1 && moment2
  ? moment1.format(DATE_FORMAT) === moment2.format(DATE_FORMAT)
  : false);

// ***** reset endTime
const onChangeEndDate = ({ setFields }) => {
  setFields({ endTime: { value: null, errors: null } });
};

// Event End Date/Time
const EndDateTimePicker = ({ decorator, getFieldValue, setFields }) => {
  const startDate = getFieldValue('startDate')
    ? moment.tz(new Date(getFieldValue('startDate')), TIMEZONE)
    : null;
  const startTime = getFieldValue('startTime')
    ? moment.tz(new Date(getFieldValue('startTime')), TIMEZONE)
    : null;
  const endDate = getFieldValue('endDate')
    ? moment.tz(new Date(getFieldValue('endDate')), TIMEZONE)
    : null;

  const disabledDate = current => (startDate ? current < startDate : false); // disabled date before start date
  const sameDate = isSameDate(startDate, endDate);
  return (
    <FormItem {...layoutHalf} label="End Date/Time">
      <Row type="flex" justify="start">
        <Col span={12}>
          <FormItem>
            {decorator('endDate')(
              <DatePicker
                {...customInput}
                format={DATE_FORMAT}
                disabledDate={disabledDate}
                disabled={!startDate}
                onChange={() => onChangeEndDate({ setFields })}
              />,
            )}
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem>
            {decorator('endTime', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value && sameDate && value < startTime) callback('End time must be greater than start time!');
                    callback();
                  },
                },
              ],
            })(
              <TimePicker
                {...customInput}
                format={TIME_FORMAT}
                minuteStep={5}
                disabledHours={() => (startTime && sameDate ? range(0, startTime.hour()) : [])
                }
                disabledMinutes={selectedHr => (startTime && sameDate && selectedHr === startTime.hour()
                  ? range(0, startTime.minute())
                  : [])
                }
                disabled={!startTime}
              />,
            )}
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  );
};

export default EndDateTimePicker;
