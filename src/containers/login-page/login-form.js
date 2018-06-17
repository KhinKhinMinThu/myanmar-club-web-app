import React from "react";
import "antd/dist/antd.css";
import { Form } from "antd";
import {
  UsernameInput,
  PasswordInput,
  ForgotPasswordLink,
  SignUpLink,
  RememberCheckbox,
  LoginButton
} from "./components";
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  usernameInputOpts = {
    rules: [
      {
        required: true,
        message: "empty username!"
      }
    ]
  };

  passwordInputOpts = {
    rules: [
      {
        required: true,
        message: "empty password!"
      }
    ]
  };

  rememberCheckboxOpts = {
    valuePropName: "checked",
    initialValue: false
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("username", this.usernameInputOpts)(UsernameInput)}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", this.passwordInputOpts)(PasswordInput)}
        </FormItem>

        <FormItem>
          {getFieldDecorator("isRemembered", this.rememberCheckboxOpts)(
            RememberCheckbox
          )}
          {ForgotPasswordLink}
          {LoginButton}
          {SignUpLink}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
