import React from 'react';
import {
  Form, Input, Radio, Card, Col, Select, Modal,
} from 'antd';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { FullButton, ExtraInfoText, HighlightText } from '../shared-styled';
import { CLIENT_ACC, ENV } from '../../../actions/constants';
import { layout } from '../shared-components';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
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

const paymentDisplay = {
  style: {
    border: 0,
    outline: 0,
    borderRadius: 0,
    padding: 0,
    fontWeight: 'bold',
    width: '100px',
    textAlign: 'right',
    marginRight: '10px',
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
export const TicketNumInput = ({ decorator, onChange }) => (
  <FormItem {...layout} label="No of Ticket(s)/Attendee(s)">
    {decorator('memberNoOfPax', {
      rules: [
        // Error: input only allow 1 to 9, can't enter a number more than 9
        // should only check if the entered value is a legit number
        // {
        //   pattern: '^([0-9])$',
        //   message: 'The input is not a number!',
        // },
        {
          required: true,
          message: 'Please enter number of tickets/attendees!',
        },
        {
          validator: (rule, value, callback) => {
            if (value && Number.isNaN(Number(value))) {
              callback('Please enter a number!');
            } else {
              callback();
            }
          },
        },
      ],
    })(<Input {...customInput} onChange={onChange} />)}
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
export const EventRegisterButton = () => (
  <FullButton type="primary" htmlType="submit">
    Register for Event
  </FullButton>
);

// Payment Radio
export const Payment = ({
  decorator,
  onSelect,
  showDirectPayment,
  paymentOption,
}) => (
  <FormItem {...layout} label="Payment Method">
    <FormItem>
      {decorator('paymentType', { initialValue: 'Bank Transfer' })(
        <RadioGroup name="paymentTypeRdo" onChange={onSelect}>
          <RadioButton value="Direct Online Payment" disabled>
            Direct Online Payment
          </RadioButton>
          <RadioButton value="Bank Transfer">Bank Transfer</RadioButton>
          <RadioButton value="Cash">Cash Payment</RadioButton>
        </RadioGroup>,
      )}
    </FormItem>
    {/* show text input if nationality is others */}
    {showDirectPayment && (
      <Col span={24}>
        <Card style={{ width: '100%', textAlign: 'left' }}>
          <FormItem
            {...layout}
            style={{ marginBottom: 0, fontWeight: 'bold' }}
            label="No. of Ticket(s)"
            colon
          >
            {decorator('ticketNum', { initialValue: '0' })(
              <Input {...paymentDisplay} />,
            )}
          </FormItem>
          <FormItem
            {...layout}
            style={{ marginBottom: 0, fontWeight: 'bold' }}
            label="Price per ticket"
            colon
          >
            {decorator('ticketPrice', { initialValue: '0' })(
              <Input {...paymentDisplay} />,
            )}
            <span>
              <HighlightText>SGD</HighlightText>{' '}
            </span>
          </FormItem>
          <FormItem
            {...layout}
            style={{ fontWeight: 'bold' }}
            label="Total Amount"
            colon
          >
            {decorator('totalAmount', { initialValue: '0' })(
              <Input {...paymentDisplay} />,
            )}
            <span>
              <HighlightText>SGD</HighlightText>{' '}
            </span>
          </FormItem>
          <FormItem style={{ marginBottom: 0 }}>
            <img
              src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
              border="0"
              alt="PayPal Logo"
              style={{ marginRight: '10px' }}
            />
            <span>
              <ExtraInfoText>Pay directly with PayPal...</ExtraInfoText>
            </span>
          </FormItem>
        </Card>
      </Col>
    )}
    {!showDirectPayment
      && paymentOption === 'Bank' && (
        <Col span={24}>
          <Card style={{ width: '100%', textAlign: 'left' }}>
            <FormItem
              {...layout}
              style={{ marginBottom: 0, fontWeight: 'bold' }}
              label="No. of Ticket(s)"
              colon
            >
              {decorator('ticketNum', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
            </FormItem>
            <FormItem
              {...layout}
              style={{ marginBottom: 0, fontWeight: 'bold' }}
              label="Price per ticket"
              colon
            >
              {decorator('ticketPrice', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
              <span>
                <HighlightText>SGD</HighlightText>{' '}
              </span>
            </FormItem>
            <FormItem
              {...layout}
              style={{ fontWeight: 'bold' }}
              label="Total Amount"
              colon
            >
              {decorator('totalAmount', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
              <span>
                <HighlightText>SGD</HighlightText>{' '}
              </span>
            </FormItem>
            <ExtraInfoText>Note:</ExtraInfoText>
            <br />
            <ExtraInfoText>
              By choosing this payment option, purchase confirmation will only
              be upon the approval of Executive Committe Member.
            </ExtraInfoText>
            <br />
            <ExtraInfoText>
              To make payment, please kindly transfer to Myanmar Club bank
              account:
            </ExtraInfoText>
            <span>
              <HighlightText> UOB 146-301-836-2 </HighlightText>
            </span>
            <br />
            <ExtraInfoText>
              Please notify Daw Mya Mya Sein at
            </ExtraInfoText>
            <span>
              <HighlightText> 82335682</HighlightText>
            </span>
            <span>
              <ExtraInfoText>
                {' '}
                after payment for confirmation.
              </ExtraInfoText>
            </span>
          </Card>
        </Col>
    )}
    {!showDirectPayment
      && paymentOption === 'Cash' && (
        <Col span={24}>
          <Card style={{ width: '100%', textAlign: 'left', marginBottom: '21px' }}>
            <FormItem
              {...layout}
              style={{ marginBottom: 0, fontWeight: 'bold' }}
              label="No. of Ticket(s)"
              colon
            >
              {decorator('ticketNum', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
            </FormItem>
            <FormItem
              {...layout}
              style={{ marginBottom: 0, fontWeight: 'bold' }}
              label="Price per ticket"
              colon
            >
              {decorator('ticketPrice', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
              <span>
                <HighlightText>SGD</HighlightText>{' '}
              </span>
            </FormItem>
            <FormItem
              {...layout}
              style={{ fontWeight: 'bold' }}
              label="Total Amount"
              colon
            >
              {decorator('totalAmount', { initialValue: '0' })(
                <Input {...paymentDisplay} />,
              )}
              <span>
                <HighlightText>SGD</HighlightText>{' '}
              </span>
            </FormItem>
            <ExtraInfoText>Note:</ExtraInfoText>
            <br />
            <ExtraInfoText>
              By choosing this payment option, purchase confirmation will only
              be upon the approval of Executive Committe Member.
            </ExtraInfoText>
            <br />
            <ExtraInfoText>
              To make payment, please kindly proceed to Myanmar Club office at
            </ExtraInfoText>
            <span>
              <HighlightText>
                {' '}
                111 North Bridge Road #05-42 Peninsula Plaza{' '}
              </HighlightText>
            </span>
            <br />
            <ExtraInfoText>
                For other enquries, contact Daw Mya Mya Sein at
            </ExtraInfoText>
            <span>
              <HighlightText> 82335682</HighlightText>
            </span>
          </Card>
        </Col>
    )}
  </FormItem>
);

// Payment Modal
export const PaymentModal = ({
  decorator,
  isModalVisible,
  onCloseModal,
  total,
  onSuccess,
  onError,
  onCancel,
}) => (
  <Modal
    title="Check out with PayPal"
    visible={isModalVisible}
    onCancel={onCloseModal}
    width={385}
    style={{ top: 10 }}
    footer={[
      <PaypalExpressBtn
        key="PaypalExBtn"
        style={{ size: 'large', tagline: 'true' }}
        client={CLIENT_ACC}
        env={ENV}
        commit
        currency="SGD"
        total={total}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />,
    ]}
  >
    <FormItem
      {...layout}
      style={{ marginBottom: 0, fontWeight: 'bold' }}
      label="No. of Ticket(s)"
      colon
    >
      {decorator('ticketNum', { initialValue: '0' })(
        <Input {...paymentDisplay} />,
      )}
    </FormItem>
    <FormItem
      {...layout}
      style={{ marginBottom: 0, fontWeight: 'bold' }}
      label="Price per ticket"
      colon
    >
      {decorator('ticketPrice', { initialValue: '0' })(
        <Input {...paymentDisplay} />,
      )}
      <span>
        <HighlightText>SGD</HighlightText>{' '}
      </span>
    </FormItem>
    <FormItem
      {...layout}
      style={{ marginBottom: 0, fontWeight: 'bold' }}
      label="Total Amount"
      colon
    >
      {decorator('totalAmount', { initialValue: '0' })(
        <Input {...paymentDisplay} />,
      )}
      <span>
        <HighlightText>SGD</HighlightText>{' '}
      </span>
    </FormItem>
  </Modal>
);

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!
export const EventData = ({ decorator }) => (
  <div>
    <FormItem>
      {decorator('photoLink', { valuePropName: 'src' })(
        <img
          alt="example"
          style={{
            width: 'auto',
            height: '200px',
            margin: '0 auto 0 auto',
            display: 'block',
            marginBottom: '7px',
          }}
        />,
      )}
    </FormItem>
    <br />
    <FormItem {...layout} style={{ marginBottom: 0 }}>
      {decorator('id')(<Input type="hidden" {...readOnlyInput} />)}
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
    <br />
    <br />
    <br />
  </div>
);
