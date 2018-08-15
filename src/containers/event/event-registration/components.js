import React from 'react';
import {
  Form, Input, DatePicker, Radio, Card, Col, Select,
} from 'antd';
import { FullButton, ExtraInfoText } from '../shared-styled';
import { layout } from '../shared-components';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker;
const Option = Select;
const customInput = { style: { width: '200px' } };
const readOnlyInput = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
  readOnly: true,
  size: 'small',
};

// Email address
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('memberEmailAddress', {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please enter your email address!',
        },
      ],
    })(<Input {...customInput} placeholder="Email Address" />)}
  </FormItem>
);

// Mobile Number
export const MobileNoInput = ({ decorator }) => {
  const areaCodeDdl = decorator('memberAreaCode', {
    initialValue: '65',
  })(
    <Select>
      <Option value="65">+65</Option>
      <Option value="95">+95</Option>
    </Select>,
  );
  return (
    <FormItem {...layout} label="Mobile No">
      {decorator('memberMobilePhone', {
        rules: [
          {
            pattern: '^([0-9]{6,})$',
            message: 'The input is not a valid phone number!',
          },
          {
            required: true,
            message: 'Please enter your phone number!',
          },
        ],
      })(
        <Input
          style={{ width: '200px', float: 'left' }}
          addonBefore={areaCodeDdl}
          placeholder="Mobile Phone"
        />,
      )}
    </FormItem>
  );
};

// Number of ticket input
export const TicketNumInput = ({ decorator }) => (
  <FormItem {...layout} label="No of Ticket(s)/Attendee(s)">
    {decorator('memberNoOfTicket', {
      rules: [
        {
          pattern: '^([0-9])$',
          message: 'The input is not a number!',
        },
        {
          required: true,
          message: 'Please enter number of tickets/attendees!',
        },
      ],
    })(<Input {...customInput} type="text" />)}
  </FormItem>
);

// Name input
export const NameInput = ({ decorator }) => (
  <FormItem {...layout} label="Name">
    {decorator('memberName', {
      rules: [
        {
          required: true,
          message: 'Please enter your name!',
        },
      ],
    })(<Input {...customInput} type="text" />)}
  </FormItem>
);

// Register Button
export const EventRegisterButton = ({ clicked }) => (
  <FullButton type="primary" htmlType="submit" onClick={clicked}>
    Register for Event
  </FullButton>
);

class PaymentToggler extends React.Component {
  state = { showDirectPayment: true };

  onSelect = (e) => {
    const { showDirectPayment } = this.state;
    // console.log('toggleDirectPayment');
    if (e.target.value === 'DP' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
    }
    if (e.target.value !== 'DP' && showDirectPayment) {
      this.setState({ showDirectPayment: false });
      // hide the fields with validator
    }
  };

  render() {
    const { render } = this.props;
    const { showDirectPayment } = this.state;
    return render(showDirectPayment, this.onSelect);
  }
}

export const Payment = ({ decorator, clicked }) => (
  <PaymentToggler
    render={(showDirectPayment, onSelect) => (
      <FormItem {...layout} label="Payment Method">
        <FormItem>
          {decorator('paymentType', { initialValue: 'DP' })(
            <RadioGroup name="paymentTypeRdo" onChange={onSelect}>
              <RadioButton value="DP">Direct Online Payment</RadioButton>
              <RadioButton value="BT">Bank Transfer</RadioButton>
              <RadioButton value="CT">Cash Payment</RadioButton>
            </RadioGroup>,
          )}
        </FormItem>
        {/* show text input if nationality is others */}
        {showDirectPayment && (
          <Col span={1}>
            <FormItem {...layout} label=" " colon={false}>
              <Card style={{ width: '500px', textAlign: 'left' }}>
                <FormItem {...layout} label="Name on Card">
                  {decorator('nameOnCard', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter cardholder name!',
                      },
                    ],
                  })(<Input {...customInput} type="text" />)}
                </FormItem>
                <FormItem {...layout} label="Card Number">
                  {decorator('cardNumber', {
                    rules: [
                      {
                        pattern: '^([0-9]{16})$',
                        message: 'The input is not a 16-digits card number!',
                      },
                      {
                        required: true,
                        message: 'Please enter card number!',
                      },
                    ],
                  })(<Input {...customInput} maxLength="16" type="text" />)}
                  <br />
                  <ExtraInfoText style={{ marginTop: '0px' }}>
                    {' '}
                    {'Do not include space or dashes "-".'}
                  </ExtraInfoText>
                </FormItem>
                <FormItem {...layout} label="Expiry Date">
                  {decorator('cardExpiry', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter card expiry month and year!',
                      },
                    ],
                  })(
                    <MonthPicker
                      placeholder="Select month and year"
                      format="MM-YYYY"
                    />,
                  )}
                  <ExtraInfoText>MM-YYYY</ExtraInfoText>
                </FormItem>
                <FormItem {...layout} label="Security Code">
                  {decorator('cardSecurityCode', {
                    rules: [
                      {
                        pattern: '^([0-9]{3,})$',
                        message: 'The input is not a 16-digits card number!',
                      },
                      {
                        required: true,
                        message: 'Please enter card security code!',
                      },
                    ],
                  })(<Input maxLength="4" type="text" />)}
                </FormItem>
                <FullButton type="primary" htmlType="submit" onClick={clicked}>
                  Make Payment Now
                </FullButton>
              </Card>
            </FormItem>
          </Col>
        )}
      </FormItem>
    )}
  />
);

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!
export const EventData = ({ decorator }) => (
  <Form>
    <FormItem>
      {decorator('photoLink', { valuePropName: 'src' })(
        <img
          alt="example"
          style={{
            width: 'auto',
            height: '200px',
            margin: '0 auto 0 auto',
            display: 'block',
          }}
        />,
      )}
    </FormItem>

    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Id">
      {decorator('id')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Name">
      {decorator('name')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Description">
      {decorator('description')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Start Date/Time">
      {decorator('startDate')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="End Date/Time">
      {decorator('endDate')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Location">
      {decorator('location')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Postal Code">
      {decorator('locationPostalCode')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Event Status">
      {decorator('eventStatus')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Ticket Fee (SGD)">
      {decorator('ticketFee')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="No of Pax">
      {decorator('noOfPax')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem
      {...layout}
      style={{ marginBottom: 0 }}
      label="Refreshment Provided"
    >
      {decorator('isRefreshmentProvided')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Contact Person">
      {decorator('contactPerson')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Email Address">
      {decorator('emailAddress')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Mobile No">
      {decorator('mobilePhone')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Created By">
      {decorator('createdBy')(<Input {...readOnlyInput} />)}
    </FormItem>
    <FormItem {...layout} style={{ marginBottom: 0 }} label="Created Date">
      {decorator('createdDate')(<Input {...readOnlyInput} />)}
    </FormItem>
  </Form>
);
