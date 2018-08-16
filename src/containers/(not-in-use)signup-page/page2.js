import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form } from 'antd';
import {
  AddressInput,
  PostalCodeInput,
  EmailAddressInput,
  FacebookAccInput,
  HobbiesInput,
  HomePhNoInput,
  MobileNoInput,
  Photo,
  SubComInterest,
  CreateAccount,
} from './components/page2-components';
import { FormCard } from './styled-components';

class Page2 extends React.Component {
  pwInputOpts = {
    rules: [
      {
        required: false,
        message: 'Please enter your password!',
      },
      {
        validator: null,
      },
    ],
  };

  confirmPwInputOpts = {
    rules: [
      {
        required: false,
        message: 'Please enter your password!',
      },
      {
        validator: null,
      },
    ],
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    confirmDirty: false,
    showPw: false,
  };

  validateToNxtPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirmPwInput'], { force: true });
    }
    callback();
  };

  validatetoFirstPassword = (rule, value, callback) => {
    /* eslint-disable no-console */
    // console.log('validatetoFirstPassword =>', value);
    const { form } = this.props;
    if (value && value !== form.getFieldValue('pwInput')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  checkExpand = (value) => {
    const { showPw } = this.state;
    const { form } = this.props;
    console.log(form.getFieldValue('subComChkList'));
    this.setState({ showPw: !showPw });

    if (value.length !== 0) {
      // show
      // console.log('SHOW THE PASSOWRD FIELDS');
      this.pwInputOpts.rules[0].required = true;
      this.pwInputOpts.rules[1].validator = this.validateToNxtPassword;
      this.confirmPwInputOpts.rules[0].required = true;
      this.confirmPwInputOpts.rules[1].validator = this.validatetoFirstPassword;
    } else {
      // hide
      // console.log('HIDE THE PASSOWRD FIELDS');
      this.pwInputOpts.rules[0].required = false;
      this.pwInputOpts.rules[1].validator = null;
      this.confirmPwInputOpts.rules[0].required = false;
      this.confirmPwInputOpts.rules[1].validator = null;
      form.setFieldsValue({ pwInput: '' });
      form.setFieldsValue({ confirmPwInput: '' });
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form>
        <FormCard style={{ textAlign: 'left' }}>
          <AddressInput decorator={getFieldDecorator} />
          <PostalCodeInput decorator={getFieldDecorator} />
          <EmailAddressInput decorator={getFieldDecorator} />
          <CreateAccount
            decorator={getFieldDecorator}
            changed={this.checkExpand}
            validatetoFirstPwd={this.validatetoFirstPassword}
            validateToNxtPwd={this.validateToNxtPassword}
          />
          <FacebookAccInput decorator={getFieldDecorator} />
          <HomePhNoInput decorator={getFieldDecorator} />
          <MobileNoInput decorator={getFieldDecorator} />
          <HobbiesInput decorator={getFieldDecorator} />
          <Photo decorator={getFieldDecorator} />
          <SubComInterest decorator={getFieldDecorator} />
        </FormCard>
      </Form>
    );
  }
}
export default Form.create()(Page2);
