import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Form, Card, Col } from 'antd';
import {
  cardStyles,
  formItemLayout,
  name1Input,
  name2Input,
  name3Input,
  genderRdo,
  dobInput,
  otherInput,
  mStatusDdl,
  eduLvlInput,
  eduLvlInfo,
  occupationInput,
  sgPassDdl,
  passNumInfo,
  NationalityDdl,
  ReligionDdl,
  PassNumInput,
} from './components-pages';

const FormItem = Form.Item;

const Page1 = class extends React.Component {
  nameInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter your name!',
      },
    ],
  };

  genderRdoOpts = { initialValue: 'M' };

  dobInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter your date of birth!',
      },
    ],
  };

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
      showOtherNatInput = getFieldDecorator('otherNatInput', this.natInputOpts)(otherInput);
    }
    if (showOtherRel) {
      showOtherRelInput = getFieldDecorator('otherRelInput')(otherInput);
    }

    return (
      <Card style={cardStyles}>
        <Form>
          {/* Name */}
          <FormItem {...formItemLayout} label="Name" colon required>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('name1Input', this.nameInputOpts)(name1Input)}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('name2Input')(name2Input)}
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem>
                {getFieldDecorator('name3Input')(name3Input)}
              </FormItem>
            </Col>
          </FormItem>

          {/* Gender */}
          <FormItem {...formItemLayout} label="Gender">
            {getFieldDecorator('genderRdo', this.genderRdoOpts)(genderRdo)}
          </FormItem>

          {/* Date of Birth */}
          <FormItem {...formItemLayout} label="Date of Birth">
            {getFieldDecorator('dobInput', this.dobInputOpts)(dobInput)}
          </FormItem>

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
              <FormItem>
                {showOtherNatInput}
              </FormItem>
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
              <FormItem>
                {showOtherRelInput}
              </FormItem>
            </Col>
          </FormItem>

          {/* Marital Status */}
          <FormItem {...formItemLayout} label="Marital Status">
            {getFieldDecorator('mStatusDdl', this.mStatusDdlOpts)(mStatusDdl)}
          </FormItem>

          {/* Education Level */}
          <FormItem {...formItemLayout} label="Education Level">
            {getFieldDecorator('eduLvlInput', this.eduLvlInputOpts)(eduLvlInput)}
            {eduLvlInfo}
          </FormItem>

          {/* Occupation */}
          <FormItem {...formItemLayout} label="Occupation">
            {getFieldDecorator('occupationInput', this.occupationInputOpts)(occupationInput)}
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
      </Card>
    );
  }
};

export default Form.create()(Page1);
