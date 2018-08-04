import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Card, Row, Col, Modal, List,
} from 'antd';
import {
  BtnWithOnClick, BackBtn, blankInput, InputWithText,
} from '../shared-components/common';
import {
  cardStyles,
  formItemLayout,
  genderRdo,
  dobInput,
  mStatusDdl,
  eduLvlInfo,
  sgPassDdl,
  passNumInfo,
  NationalityDdl,
  ReligionDdl,
  PassNumInput,
  addr1Input,
  addr2Input,
  pwInput,
  pwInfo,
  areaCodeDdl,
  hobbiesInput,
  UploadBtn,
  subComChkCutrl,
  subComChkKnwlg,
  subComChkComty,
  subComChkSport,
  subComChkSposr,
  subComChkOutrh,
  ConfirmPwInput,
  ZipCodeInput,
  HomeNoInput,
  MobileNoInput,
} from '../shared-components/member-info-components';

const FormItem = Form.Item;

class Profile extends React.Component {
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

  addrInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter your address!',
      },
    ],
  };

  zipCodeInputOpts = {
    rules: [
      {
        pattern: '^([0-9]{6})$',
        message: 'The input is not a valid postal/zip code!',
      },
      {
        required: true,
        message: 'Please enter your postal/zip code!',
      },
    ],
  };

  emailInputOpts = {
    rules: [
      {
        type: 'email',
        message: 'The input is not valid email address! ',
      },
      {
        required: true,
        message: 'Please enter your email address!',
      },
    ],
  };

  pwInputOpts = {
    rules: [
      {
        required: true,
        message: 'Please enter your password!',
      },
      {
        validator: (rule, value, callback) => {
          /* eslint-disable no-console */
          // console.log('validateToNxtPassword => ', value);
          const { confirmDirty } = this.state;
          const { form } = this.props;
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
        message: 'Please enter your password!',
      },
      {
        validator: (rule, value, callback) => {
          /* eslint-disable no-console */
          // console.log('validatetoFirstPassword =>', value);
          const { form } = this.props;
          if (value && value !== form.getFieldValue('pwInput')) {
            callback('Two passwords that you enter is inconsistent!');
          } else {
            callback();
          }
        },
      },
    ],
  };

  homeNoInputOpts = {
    rules: [
      {
        pattern: '^([0-9]{6,})$',
        message: 'The input is not a valid phone number!',
      },
    ],
  };

  mobileNoInputOpts = {
    rules: [
      {
        pattern: '^([0-9]{6,})$',
        message: 'The input is not a valid phone number!',
      },
      {
        required: true,
        message: 'Please enter your mobile phone number!',
      },
    ],
  };

  uploadBtnOpts = {
    rules: [
      {
        // required: true,
        required: false,
        message: 'Please upload your passport size photo!',
      },
    ],
  };

  subComChkOpts = {
    valuePropName: 'checked',
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    confirmDirty: false,
    showOtherNat: false,
    showOtherRel: false,
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    membershipInfo: [
      {
        title: 'Membership Type :',
        value: 'Life',
      },
      {
        title: 'Membership Status :',
        value: 'Active',
      },
      {
        title: 'Join Date :',
        value: '12-JUN-2018',
      },
      {
        title: 'Expiry Date :',
        value: '12-JUN-2019',
      },
      {
        title: 'Last Payment Date :',
        value: '12-JUN-2018',
      },
    ],
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

  handleZipCodeOnBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ zipCodeInput: value });
    form.validateFields(['zipCodeInput'], { force: true });
  };

  handleConfirmOnChange = (e) => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
    const { form } = this.props;
    form.setFieldsValue({ confirmPwInput: value });
    form.validateFields(['confirmPwInput'], { force: true });
  };

  handleHomeNoOnBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ homeNoInput: value });
    form.validateFields(['homeNoInput'], { force: true });
  };

  handleMobileNoOnBlur = (e) => {
    const value = e.target.value.trim();
    const { form } = this.props;
    form.setFieldsValue({ mobileNoInput: value });
    form.validateFields(['mobileNoInput'], { force: true });
  };

  handleImgPreviewOnCancel = () => this.setState({ previewVisible: false });

  handleImgOnPreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleImgOnChange = ({ fileList }) => {
    // this.setState({ fileList });
    if (fileList.length > 1) {
      const newFile = fileList.slice(1);
      this.setState({ fileList: newFile });
    }
  };

  handleUpdateProfile = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /* eslint-disable no-console */
        console.log('Profile updated!', values);
      }
    });
  };

  handleRequestRenewal = () => {
    console.log('request renewal!');
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const {
      showOtherNat,
      showOtherRel,
      previewVisible,
      previewImage,
      fileList,
      membershipInfo,
    } = this.state;
    const prefixAreaCode = getFieldDecorator('areadCodeDdl', {
      initialValue: '65',
    })(areaCodeDdl);

    let showOtherNatInput = null;
    let showOtherRelInput = null;
    if (showOtherNat) {
      showOtherNatInput = getFieldDecorator('otherNatInput', this.natInputOpts)(blankInput);
    }
    if (showOtherRel) {
      showOtherRelInput = getFieldDecorator('otherRelInput')(blankInput);
    }

    return (
      <div>
        <Card style={cardStyles} title="Member's Profile">
          <Form>
            {/* Name */}
            <FormItem {...formItemLayout} label="Name" colon required>
              <Col span={7}>
                <FormItem>
                  {getFieldDecorator('name1Input', this.nameInputOpts)(
                    <InputWithText text="First Name" />,
                  )}
                </FormItem>
              </Col>
              <Col span={7}>
                <FormItem>
                  {getFieldDecorator('name2Input')(<InputWithText text="Middle Name" />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem>
                  {getFieldDecorator('name3Input')(<InputWithText text="Last Name" />)}
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

            {/* Address */}
            <FormItem {...formItemLayout} label="Address" colon required>
              <Col span={10}>
                <FormItem>
                  {getFieldDecorator('addr1Input', this.addrInputOpts)(addr1Input)}
                </FormItem>
              </Col>
              <Col span={14}>
                <FormItem>
                  {getFieldDecorator('addr2Input')(addr2Input)}
                </FormItem>
              </Col>
            </FormItem>

            {/* Postal Code */}
            <FormItem {...formItemLayout} label="Postal Code">
              {getFieldDecorator('zipCodeInput', this.zipCodeInputOpts)(
                <ZipCodeInput blurred={this.handleZipCodeOnBlur} />,
              )}
            </FormItem>

            {/* Email Address */}
            <FormItem {...formItemLayout} label="Email Address">
              {getFieldDecorator('emailInput', this.emailInputOpts)(
                <InputWithText text="Email Address" />,
              )}
            </FormItem>

            {/* Passwords */}
            <FormItem {...formItemLayout} label="Password">
              {getFieldDecorator('pwInput', this.pwInputOpts)(pwInput)}
            </FormItem>
            <FormItem {...formItemLayout} label="Confirm Password">
              {getFieldDecorator('confirmPwInput', this.confirmPwInputOpts)(
                <ConfirmPwInput changed={this.handleConfirmOnChange} />,
              )}
            </FormItem>
            <Col xs={{ offset: 0 }} sm={{ offset: 8 }}>
              {pwInfo}
              <br />
            </Col>

            {/* Facebook Account */}
            <FormItem {...formItemLayout} label="Facebook Account">
              {getFieldDecorator('fbAccInput')(<InputWithText text="Facebook Profile Link" />)}
            </FormItem>

            {/* Home Phone Number */}
            <FormItem {...formItemLayout} label="Home Phone Number">
              {getFieldDecorator('homeNoInput', this.homeNoInputOpts)(
                <HomeNoInput blurred={this.handleHomeNoOnBlur} />,
              )}
            </FormItem>

            {/* Mobiel Number */}
            <FormItem {...formItemLayout} label="Mobile Number">
              {getFieldDecorator('mobileNoInput', this.mobileNoInputOpts)(
                <MobileNoInput areadCodeBef={prefixAreaCode} blurred={this.handleMobileNoOnBlur} />,
              )}
            </FormItem>

            {/* Hobbies */}
            <FormItem {...formItemLayout} label="Hobbies">
              {getFieldDecorator('hobbiesInput')(hobbiesInput)}
            </FormItem>

            {/* Passport Size Photo */}
            <FormItem {...formItemLayout} label="Passport Size Photo">
              {getFieldDecorator('uploadBtn', this.uploadBtnOpts)(
                <UploadBtn
                  previewed={this.handleImgOnPreview}
                  changed={this.handleImgOnChange}
                  fileList={fileList}
                />,
              )}
            </FormItem>

            <Modal visible={previewVisible} footer={null} onCancel={this.handleImgPreviewOnCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>

            {/* Sub-Com Interests */}
            <FormItem {...formItemLayout} label="Interested Sub-Committee(s)">
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkCutrl', this.subComChkOpts)(subComChkCutrl)}
                </FormItem>
              </Col>
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkKnwlg', this.subComChkOpts)(subComChkKnwlg)}
                </FormItem>
              </Col>
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkComty', this.subComChkOpts)(subComChkComty)}
                </FormItem>
              </Col>
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkSport', this.subComChkOpts)(subComChkSport)}
                </FormItem>
              </Col>
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkSposr', this.subComChkOpts)(subComChkSposr)}
                </FormItem>
              </Col>
              <Col>
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('subComChkOutrh', this.subComChkOpts)(subComChkOutrh)}
                </FormItem>
              </Col>
            </FormItem>

            {/* Buttons */}
            <Row gutter={8}>
              <Col span={12}>
                <BtnWithOnClick clicked={this.handleUpdateProfile} text="Save Update" />
              </Col>
              <Col span={12}>
                <BackBtn clicked={this.handleUpdateProfile} />
              </Col>
            </Row>
          </Form>
        </Card>
        <br />

        {/* Membership Information */}
        <Card style={cardStyles} title="Membership Information">
          <List
            size="small"
            split={false}
            bordered={false}
            dataSource={membershipInfo}
            renderItem={item => (
              <List.Item>
                <Col
                  xs={{ span: 4 }}
                  sm={{ span: 8 }}
                  style={{ textAlign: 'right', paddingRight: 7 }}
                >
                  {item.title}
                </Col>
                <Col xs={{ span: 20 }} sm={{ span: 16 }} style={{ fontWeight: 'bold' }}>
                  {item.value}
                </Col>
              </List.Item>
            )}
          />
          <br />
          <BtnWithOnClick clicked={this.handleRequestRenewal} text="Request Membership Renewal" />
        </Card>
      </div>
    );
  }
}

export default Form.create({
  mapPropsToFields() {
    return {
      subComChkCutrl: Form.createFormField({
        value: true,
      }),
      hobbiesInput: Form.createFormField({
        value: 'reading',
      }),
      mStatusDdl: Form.createFormField({
        value: 'MA',
      }),
    };
  },
})(Profile);
