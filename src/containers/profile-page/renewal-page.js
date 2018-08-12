import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Card, Row, Col, message,
} from 'antd';
import { feesTbl } from '../signup-page/components/pageinfo-components';
import { FormCard } from './styled-components';
import {
  layout,
  NameOnCardInput,
  CardNumInput,
  CardExpiryPicker,
  PaymentButton,
  CardSecurityCodeInput,
  MembershipTypeRadio,
  PaymentTypeRadio,
} from '../signup-page/components/page3-components';
import { RequestRenewalButton, BackButton } from './components';

const FormItem = Form.Item;

class RenewalPage extends React.Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = { showDirectPayment: true };

  handleCreditCardForm = () => {
    const { form } = this.props;
    form.validateFields(
      ['cardNameInput', 'cardNumInput', 'cardExpInput', 'cardSecInput'],
      {
        force: true,
      },
    );
  };

  toggleDirectPayment = (e) => {
    const { showDirectPayment } = this.state;
    const { form } = this.props;

    if (e.target.value === 'DP' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: false });
      form.getFieldDecorator('cardSecInput', { hidden: false });
      form.resetFields(['cardNumInput', 'cardSecInput']);
    }
    if (e.target.value !== 'DP' && showDirectPayment) {
      this.setState({ showDirectPayment: false });
      // hide the fields with validator
      form.getFieldDecorator('cardNumInput', { hidden: true });
      form.getFieldDecorator('cardSecInput', { hidden: true });
    }
  };

  handleRequestRenewal = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /* eslint-disable no-console */
        console.log('Profile updated!', values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { showDirectPayment } = this.state;

    let creditCardForm = null;
    if (showDirectPayment) {
      creditCardForm = (
        <FormItem {...layout} label=" " colon={false}>
          <Card>
            <NameOnCardInput decorator={getFieldDecorator} />
            <CardNumInput decorator={getFieldDecorator} />
            <CardExpiryPicker decorator={getFieldDecorator} />
            <CardSecurityCodeInput decorator={getFieldDecorator} />
            <PaymentButton onClick={this.handleCreditCardForm} />
          </Card>
        </FormItem>
      );
    }
    return (
      <div>
        <FormCard title="Membership Fees">
          <Form>
            <Row>
              <Col offset={6} span={12}>
                <FormItem>{feesTbl}</FormItem>
              </Col>
            </Row>

            {/* Membership Fee */}
            <MembershipTypeRadio decorator={getFieldDecorator} />
            {/* Payment Method */}
            <PaymentTypeRadio decorator={getFieldDecorator} />
            {creditCardForm}
            <br />

            <RequestRenewalButton clicked={this.handleRequestRenewal} />

            <BackButton
              clicked={() => message.success('Processing complete!')}
            />
          </Form>
        </FormCard>
      </div>
    );
  }
}

export default Form.create({})(RenewalPage);
