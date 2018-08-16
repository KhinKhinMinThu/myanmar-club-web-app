import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import {
  Form, Card, Row, Col,
} from 'antd';
import { feesTbl } from './components/pageinfo-components';
import {
  layout,
  NameOnCardInput,
  CardNumInput,
  CardExpiryPicker,
  PaymentButton,
  MembershipTypeRadio,
  PaymentTypeRadio,
  CardSecurityCodeInput,
  DeclarationInfo,
  DeclarationCheckBox,
  ContactInfo,
} from './components/page3-components';
import { FormCard } from './styled-components';

const FormItem = Form.Item;

class Page3 extends React.Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = { showDirectPayment: true };

  handleCreditCardForm = () => {
    /* eslint-disable no-console */
    // console.log('handleCreditCardForm');
    const { form } = this.props;
    form.validateFields(
      ['cardNameInput', 'cardNumInput', 'cardExpInput', 'cardSecInput'],
      {
        force: true,
      },
    );
  };

  toggleDirectPayment = (e) => {
    // console.log('toggleDirectPayment');
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
      <Form>
        <FormCard style={{ textAlign: 'left' }}>
          <Row>
            <Col offset={6} span={12}>
              <FormItem>{feesTbl}</FormItem>
            </Col>
          </Row>
          {/* Membership Fee */}
          <MembershipTypeRadio decorator={getFieldDecorator} />

          {/* Payment Method */}
          <PaymentTypeRadio
            decorator={getFieldDecorator}
            changed={this.toggleDirectPayment}
          />

          {creditCardForm}

          <FormItem
            {...{
              labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
              },
            }}
            label=" "
            colon={false}
          >
            {/* Declaration */}
            <DeclarationInfo decorator={getFieldDecorator} />
            <DeclarationCheckBox decorator={getFieldDecorator} />

            {/* Contact Info */}
            <ContactInfo decorator={getFieldDecorator} />
          </FormItem>
        </FormCard>
      </Form>
    );
  }
}
export default Form.create()(Page3);
