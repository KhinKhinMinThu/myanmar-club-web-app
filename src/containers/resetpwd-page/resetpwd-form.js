import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { NewPwInput, ConfirmPwInput, ResetpwdButton } from './components';

const FormItem = Form.Item;

class ResetpwdForm extends React.Component {
  newPwInputOpts = {
    rules: [
      {
        required: true,
        message: 'empty new password!',
      },
      {
        validator: (rule, value, callback) => {
          const { form } = this.props;
          const { confirmDirty } = this.state;
          if (value && confirmDirty) {
            form.validateFields(['confirmPwInput'], { force: true });
          }
          callback();
        },
      },
    ],
  };

  confirmPwInputOpts = {
    rules: [
      {
        required: true,
        message: 'empty confirm new password!',
      },
      {
        validator: (rule, value, callback) => {
          const { form } = this.props;
          if (value && value !== form.getFieldValue('newPwInput')) {
            callback('Two passwords that you enter is inconsistent!');
          } else {
            callback();
          }
        },
      },
    ],
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ confirmPwInput: value });
    form.validateFields(['confirmPwInput'], { force: true });
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
          {getFieldDecorator('newPwInput', this.newPwInputOpts)(NewPwInput)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirmPwInput', this.confirmPwInputOpts)(
            <ConfirmPwInput blurred={this.handleConfirmBlur} />,
          )}
        </FormItem>
        <FormItem>
          {ResetpwdButton}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ResetpwdForm);
