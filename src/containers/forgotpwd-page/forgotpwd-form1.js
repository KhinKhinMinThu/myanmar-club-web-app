import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form, Card } from 'antd';
import { EmailInput, ResetpwdButton, BackButton } from './components';
import { cardStyles } from '../shared-components/common';

const FormItem = Form.Item;

const ForgotpwdPage1 = () => (
  <div className="login-page">
    <Card bordered={false} style={cardStyles}>
      <div style={{ marginTop: '30px' }}>
        {'Enter your email address to reset the password'}
      </div>
      <div style={{ marginTop: '30px' }}>
        <ForgotpwdForm1 />
      </div>
    </Card>
  </div>
);

class ForgotpwdForm extends React.Component {
  emailInputOpts = {
    rules: [
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
      {
        required: true,
        message: 'empty email address!',
      },
    ],
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  handleEmailBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ emailInput: value });
    form.validateFields(['emailInput'], { force: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        /* eslint-disable no-console */
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('emailInput', this.emailInputOpts)(
            <EmailInput blurred={this.handleEmailBlur} />,
          )}
        </FormItem>
        <FormItem>
          {ResetpwdButton}
          {BackButton}
        </FormItem>
      </Form>
    );
  }
}

const ForgotpwdForm1 = Form.create()(ForgotpwdForm);

export default ForgotpwdPage1;
