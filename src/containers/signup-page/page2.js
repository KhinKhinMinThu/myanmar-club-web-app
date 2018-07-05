import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import {
  Form, Card, Col, Collapse, Modal,
} from 'antd';
import {
  cardStyles,
  formItemLayout,
  addr1Input,
  addr2Input,
  emailInput,
  pwInput,
  pwInfo,
  fbAccInput,
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
const { Panel } = Collapse;

class Page2 extends React.Component {
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

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    confirmDirty: false,
    showPw: false,
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

  validateToNxtPassword = (rule, value, callback) => {
    /* eslint-disable no-console */
    // console.log('validateToNxtPassword => ', value);
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
    console.log('>>>>>', fileList);
    // this.setState({ fileList });
    if (fileList.length > 1) {
      const newFile = fileList.slice(1);
      this.setState({ fileList: newFile });
    }
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { previewVisible, previewImage, fileList } = this.state;
    const prefixAreaCode = getFieldDecorator('areadCodeDdl', {
      initialValue: '65',
    })(areaCodeDdl);

    return (
      <Card style={cardStyles}>
        <Form>
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
            {getFieldDecorator('emailInput', this.emailInputOpts)(emailInput)}
          </FormItem>

          {/* Passwords */}
          <FormItem {...formItemLayout} label=" " colon={false}>
            <Collapse onChange={this.checkExpand}>
              <Panel header="Create a Myanmar Club Account...">
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
                </Col>
              </Panel>
            </Collapse>
          </FormItem>

          {/* Facebook Account */}
          <FormItem {...formItemLayout} label="Facebook Account">
            {getFieldDecorator('fbAccInput')(fbAccInput)}
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
                {getFieldDecorator('subComChk_CUTRL')(subComChkCutrl)}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={{ marginBottom: 0 }}>
                {getFieldDecorator('subComChk_KNWLG')(subComChkKnwlg)}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={{ marginBottom: 0 }}>
                {getFieldDecorator('subComChk_COMTY')(subComChkComty)}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={{ marginBottom: 0 }}>
                {getFieldDecorator('subComChk_SPORT')(subComChkSport)}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={{ marginBottom: 0 }}>
                {getFieldDecorator('subComChk_SPOSR')(subComChkSposr)}
              </FormItem>
            </Col>
            <Col>
              <FormItem style={{ marginBottom: 0 }}>
                {getFieldDecorator('subComChk_OUTRH')(subComChkOutrh)}
              </FormItem>
            </Col>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(Page2);
