import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form, Col } from 'antd';
import { InputWithText, blankInput } from '../shared-components/common';
import {
  formItemLayout,
  mStatusDdl,
  eduLvlInfo,
  sgPassDdl,
  passNumInfo,
  NationalityDdl,
  ReligionDdl,
  PassNumInput,
} from './components';

const FormItem = Form.Item;

const Page1 = class extends React.Component {
  natInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please specify your nationality!',
      },
    ],
  };

  mStatusDdlOpts = { initialValue: 'SI' };

  eduLvlInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please ender your education level!',
      },
    ],
  };

  occupationInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please ender your education level!',
      },
    ],
  };

  sgPassDdlOpts = { initialValue: 'SP' };

  passNumInputOpts = {
    rules: [
      {
        pattern: '^([A-Z]|[a-z])([0-9]{7})([A-Z]|[a-z])$',
        message: 'The input is not a valid ID Number!',
      },
      {
        required: true,
        message: 'Please enter your ID Number!',
      },
    ],
  };

  static propTypes = {
    form: PropTypes.shape({}),
  };

  static defaultProps = {
    form: PropTypes.shape({}),
  };

  state = {
    showOtherNat: false,
    showOtherRel: false,
  };

  nationalityDdlChanged = (value) => {
    /* eslint-disable no-console */
    // console.log("nationalityDdlChanged", value);
    const { showOtherNat } = this.state;
    if (value === 'OT' && !showOtherNat) {
      this.setState({ showOtherNat: true });
    }
    if (value !== 'OT' && showOtherNat) {
      this.setState({ showOtherNat: false });
    }
  };

  religionDdlChanged = (value) => {
    const { showOtherRel } = this.state;
    if (value === 'OT' && !showOtherRel) {
      this.setState({ showOtherRel: true });
    }
    if (value !== 'OT' && showOtherRel) {
      this.setState({ showOtherRel: false });
    }
  };

  handlePassNumOnBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ passNumInput: value });
    form.validateFields(['passNumInput'], { force: true });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { showOtherNat, showOtherRel } = this.state;

    let showOtherNatInput = null;
    let showOtherRelInput = null;
    if (showOtherNat) {
      showOtherNatInput = getFieldDecorator('otherNatInput', this.natInputOpts)(
        blankInput,
      );
    }
    if (showOtherRel) {
      showOtherRelInput = getFieldDecorator('otherRelInput')(blankInput);
    }

    return (
      <Form>
        {/* Nationality */}
        <FormItem {...formItemLayout} label="Nationality" colon required>
          <Col span={7}>
            <FormItem>
              {getFieldDecorator('nationalityDdl')(
                <NationalityDdl changed={this.nationalityDdlChanged} />,
              )}
            </FormItem>
          </Col>
          <Col span={17}>
            <FormItem>{showOtherNatInput}</FormItem>
          </Col>
        </FormItem>

        {/* Religion */}
        <FormItem {...formItemLayout} label="Religion">
          <Col span={7}>
            <FormItem>
              {getFieldDecorator('religionDdl')(
                <ReligionDdl changed={this.religionDdlChanged} />,
              )}
            </FormItem>
          </Col>
          <Col span={17}>
            <FormItem>{showOtherRelInput}</FormItem>
          </Col>
        </FormItem>

        {/* Marital Status */}
        <FormItem {...formItemLayout} label="Marital Status">
          {getFieldDecorator('mStatusDdl', this.mStatusDdlOpts)(mStatusDdl)}
        </FormItem>

        {/* Education Level */}
        <FormItem {...formItemLayout} label="Education Level">
          {getFieldDecorator('eduLvlInput', this.eduLvlInputOpts)(
            <InputWithText text="Education Level" />,
          )}
          {eduLvlInfo}
        </FormItem>

        {/* Occupation */}
        <FormItem {...formItemLayout} label="Occupation">
          {getFieldDecorator('occupationInput', this.occupationInputOpts)(
            <InputWithText text="Job Title" />,
          )}
        </FormItem>

        {/* Pass */}
        <FormItem {...formItemLayout} label="Singapore Pass">
          {getFieldDecorator('sgPassDdl', this.sgPassDdlOpts)(sgPassDdl)}
        </FormItem>

        {/* ID Number */}
        <FormItem {...formItemLayout} label="Identification Number">
          {getFieldDecorator('passNumInput', this.passNumInputOpts)(
            <PassNumInput blurred={this.handlePassNumOnBlur} />,
          )}
          {passNumInfo}
        </FormItem>
      </Form>
    );
  }
};

export default Form.create()(Page1);
