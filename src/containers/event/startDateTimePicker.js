import React from 'react';
import moment from 'moment-timezone';
import {
  Form, DatePicker, TimePicker, Row, Col,
} from 'antd';
import {
  layout,
  inputLayout1,
  inputLayout2,
  customInput,
} from './shared-components';
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

// ***** set endDate if endDate < startDate
// ***** reset startTime & endTime
const onChangeStartDate = ({ value, endDate, setFields }) => {
  const shouldSetDate = endDate ? endDate < value : true;
  if (shouldSetDate) setFields({ endDate: { value } });
  setFields({ startTime: { value: null, errors: null } });
  setFields({ endTime: { value: null, errors: null } });
};

// ***** set endTime if endTime < startTime on sameDate
const onChangeStartTime = ({ value, endTime, setFields }) => {
  const shouldSetTime = endTime ? endTime < value : true;
  if (shouldSetTime) setFields({ endTime: { value } });
};

// Event Start Date/Time
const StartDateTimePicker = ({ decorator, getFieldValue, setFields }) => {
  const currentDT = moment.tz(new Date(), TIMEZONE);
  const endDate = getFieldValue('endDate')
    ? moment.tz(new Date(getFieldValue('endDate')), TIMEZONE)
    : null;
  const endTime = getFieldValue('endTime')
    ? moment.tz(new Date(getFieldValue('endTime')), TIMEZONE)
    : null;
  const startDate = getFieldValue('startDate')
    ? moment.tz(new Date(getFieldValue('startDate')), TIMEZONE)
    : null;

  const disabledDate = current => current < moment().startOf('day'); // disabled date before today .add(0, 'days')
  const sameDate = isSameDate(currentDT, startDate);

  return (
    <FormItem {...layout} label="Start Date/Time" colon required>
      <Row type="flex" justify="start">
        <Col {...inputLayout1}>
          <FormItem>
            {decorator('startDate', {
              rules: [{ required: true, message: 'Please enter start date!' }],
            })(
              <DatePicker
                {...customInput}
                format={DATE_FORMAT}
                disabledDate={disabledDate}
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
            {decorator('startTime', {
              rules: [
                { required: true, message: 'Please enter start time!' },
                {
                  validator: (rule, value, callback) => {
                    if (value && sameDate && value < currentDT) callback('Start time must be greater than current time!');
                    callback();
                  },
                },
              ],
            })(
              <TimePicker
                {...customInput}
                format={TIME_FORMAT}
                minuteStep={5}
                disabledHours={() => (sameDate ? range(0, currentDT.hour()) : [])
                }
                disabledMinutes={selectedHr => (sameDate && selectedHr === currentDT.hour()
                  ? range(0, currentDT.minute())
                  : [])
                }
                onChange={value => onChangeStartTime({ value, endTime, setFields })
                }
                disabled={!startDate}
              />,
            )}
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  );
};

export default StartDateTimePicker;
