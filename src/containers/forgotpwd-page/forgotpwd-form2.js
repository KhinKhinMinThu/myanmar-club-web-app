import React from 'react';
import { Form, Card } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { GoToLoginButton, CloseButton } from './components';
import { cardStyles } from '../shared-components/common';

const FormItem = Form.Item;

const ForgotpwdPage2 = () => (
  <div className="login-page">
    <Card bordered={false} style={cardStyles}>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        {
          'Password reset link has been sent to "xxx@gmail.com". Please check the email and follow the instrution to reset your password.'
        }
      </div>
      <div style={{ marginTop: '35px' }}>
        <ForgotpwdForm2 />
      </div>
    </Card>
  </div>
);

class ForgotpwdForm2 extends React.Component {
  static propTypes = {
    form: PropTypes.shape({}).isRequired,
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {GoToLoginButton}
          {CloseButton}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ForgotpwdPage2);
