import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form } from 'antd';
import { login } from '../../reducers/login';
import {
  UsernameInput,
  PasswordInput,
  ForgotPasswordLink,
  SignUpLink,
  RememberCheckbox,
  LoginButton,
} from './components';

const FormItem = Form.Item;

class LoginForm extends Component {
  usernameInputOpts = {
    rules: [
      {
        required: true,
        message: 'empty username!',
      },
    ],
  };

  passwordInputOpts = {
    rules: [
      {
        required: true,
        message: 'empty password!',
      },
    ],
  };

  rememberCheckboxOpts = {
    valuePropName: 'checked',
    initialValue: false,
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
    status: PropTypes.bool.isRequired,
    networkErrorMsg: PropTypes.string.isRequired,
    isPending: PropTypes.bool.isRequired,
    performLogin: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const { status, networkErrorMsg, isPending } = this.props;
    if (isPending) return;
    if (networkErrorMsg !== '');
    else if (!status);
    else; /* navigate to home page */
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        /* eslint-disable no-console */
        console.log('Received values of form: ', values);
        const { username, password } = values;
        const { performLogin } = this.props;
        performLogin({ username, password });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', this.usernameInputOpts)(UsernameInput)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', this.passwordInputOpts)(PasswordInput)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('isRemembered', this.rememberCheckboxOpts)(RememberCheckbox)}
          {ForgotPasswordLink}
          {LoginButton}
          {SignUpLink}
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { isPending, status, networkErrorMsg } = state.login;
  return {
    isPending,
    status,
    networkErrorMsg,
  };
};

export default connect(
  mapStateToProps,
  { performLogin: login },
)(Form.create()(LoginForm));
