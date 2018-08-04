import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form, message } from 'antd';
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
  // **** client side field checking **** //

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

  // **** client side field checking ends **** //

  rememberCheckboxOpts = {
    valuePropName: 'checked',
    initialValue: false,
  };

  componentDidUpdate(prevProps) {
    const { errMsg, isPending } = this.props;
    const isApiCall = prevProps.isPending === true && isPending === false;

    if (!isApiCall) return;
    if (errMsg !== '') this.showError(errMsg);
    else message.success('redirect to home page!');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, performLogin } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        performLogin({ username, password });
      }
    });
  };

  // **** server side field checking **** //

  showError = (errMsg) => {
    const { form } = this.props;

    form.setFields({
      username: {
        errors: [new Error(' ')],
      },
      password: {
        errors: [new Error(errMsg)],
      },
    });
  };

  // **** server side field checking ends **** //

  render() {
    const { form, isPending } = this.props;
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
          <ForgotPasswordLink />
          <LoginButton isPending={isPending} />
          <SignUpLink />
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  errMsg: PropTypes.string,
  isPending: PropTypes.bool.isRequired,
  performLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  errMsg: null,
};

const mapStateToProps = (state) => {
  const { isPending, errMsg } = state.login;
  return {
    isPending,
    errMsg,
  };
};

export default connect(
  mapStateToProps,
  { performLogin: login },
)(Form.create()(LoginForm));
