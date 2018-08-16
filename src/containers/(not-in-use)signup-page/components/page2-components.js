import React, { Component } from 'react';
import {
  Form,
  Col,
  Select,
  Row,
  Input,
  Upload,
  Modal,
  Icon,
  Checkbox,
  Collapse,
} from 'antd';
import { FormInput, ExtraInfoText } from '../styled-components';

export const unicode = { fontFamily: 'Myanmar3', fontSize: 14 };
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

/* eslint react/prop-types: 0 */
// ALL FORM ITEM MUST PASS IN decorator!

// Location Address
export const AddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Address" colon required>
    <Row gutter={8} type="flex" justify="start">
      <Col span="10">
        <FormItem>
          {decorator('locationLine1', {
            rules: [
              {
                required: true,
                message: 'Please enter your address!',
              },
            ],
          })(
            <FormInput
              style={{ width: '300px' }}
              placeholder="Street Address Line 1..."
            />,
          )}
        </FormItem>
      </Col>
      <Col span="10">
        <FormItem>
          {decorator('locationLine2')(
            <FormInput
              style={{ width: '300px' }}
              placeholder="Street Address Line 2..."
            />,
          )}
        </FormItem>
      </Col>
    </Row>
  </FormItem>
);

// Postal Code
export const PostalCodeInput = ({ decorator }) => (
  <FormItem {...layout} label="Postal Code">
    {decorator('postalCode', {
      rules: [
        {
          pattern: '^([0-9]{6})$',
          message: 'The input is not a valid postal/zip code!',
        },
        {
          required: true,
          message: 'Please enter postal/zip code!',
        },
      ],
    })(<FormInput maxLength="6" placeholder="Postal/Zip Code" />)}
  </FormItem>
);

// Email address
export const EmailAddressInput = ({ decorator }) => (
  <FormItem {...layout} label="Email Address">
    {decorator('emailAddress', {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please enter your email address!',
        },
      ],
    })(<FormInput placeholder="Email Address" />)}
  </FormItem>
);

// Mobiel Number

export const MobileNoInput = ({ decorator }) => {
  const areaCodeDdl = decorator('areaCode', {
    initialValue: '65',
  })(
    <Select>
      <Option value="65">+65</Option>
      <Option value="95">+95</Option>
    </Select>,
  );
  return (
    <FormItem {...layout} label="Mobile No">
      {decorator('mobilePhone', {
        rules: [
          {
            pattern: '^([0-9]{6,})$',
            message: 'The input is not a valid phone number!',
          },
        ],
      })(
        <FormInput
          style={{ width: '200px', float: 'left' }}
          addonBefore={areaCodeDdl}
          placeholder="Mobile Phone"
        />,
      )}
    </FormItem>
  );
};

// Homephone Number
export const HomePhNoInput = ({ decorator }) => (
  <FormItem {...layout} label="Home Phone Number">
    {decorator('homePhNo')(<FormInput placeholder="Line Phone Number" />)}
  </FormItem>
);

// Facebook Account
export const FacebookAccInput = ({ decorator }) => (
  <FormItem {...layout} label="Facebook Account">
    {decorator('facebookLink')(
      <FormInput placeholder="Facebook Profile Link" />,
    )}
  </FormItem>
);

// Hobbies
export const HobbiesInput = ({ decorator }) => (
  <FormItem {...layout} label="Hobbies">
    {decorator('hobbies')(
      <TextArea style={{ width: '200px', float: 'left' }} />,
    )}
  </FormItem>
);

// Passport Size photo
export class Photo extends Component {
  state = {
    isModalVisible: false,
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
      photoLink: '',
    });
  };

  showModal = (file) => {
    this.setState({
      isModalVisible: true,
      photoLink: file.url || file.thumbUrl,
    });
  };

  render() {
    const { decorator } = this.props;
    const { isModalVisible, photoLink } = this.state;
    this.newFile = [];
    return (
      // must use inline style due to layout
      <FormItem
        {...layout}
        label="Passport Size Photo"
        style={{ marginBottom: 0 }}
      >
        {decorator('uploadBtn', {
          valuePropName: 'fileList',
          initialValue: [],
          getValueFromEvent: ({ fileList }) => {
            this.newFile = fileList.length > 1 ? fileList.slice(1) : fileList;
            return this.newFile;
          },
        })(
          <Upload
            name="eventpic"
            action=""
            listType="picture-card"
            onPreview={this.showModal}
          >
            {this.newFile.length >= 2 ? null : (
              <div>
                <Icon type="plus" />
                <div>Upload New Photo</div>
              </div>
            )}
          </Upload>,
        )}
        <Modal
          visible={isModalVisible}
          onCancel={this.onCloseModal}
          footer={null}
        >
          <img alt="example" width="100%" src={photoLink} />
        </Modal>
      </FormItem>
    );
  }
}

// sub-com interest
export const SubComInterest = ({ decorator }) => (
  <FormItem {...layout} label="Interested Sub-Committee(s)">
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_Cutrl')(
          <Checkbox style={{ unicode, float: 'left' }}>
            {
              'မြန်မာ့ယဉ်ကျေးမှုအနုပညာ ထိန်းသိမ်းမြှင့်တင် ပျံ့ပွားရေး Sub-Committee'
            }
          </Checkbox>,
        )}
      </FormItem>
    </Col>
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_KNWLG')(
          <Checkbox style={{ unicode, float: 'left' }}>
            {'စာပေ၊ ဗဟုသုတ၊ တတ်သိပညာ မြှင့်တင် ပျံ့ပွားရေး Sub-Committee'}
          </Checkbox>,
        )}
      </FormItem>
    </Col>
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_COMTY')(
          <Checkbox style={{ unicode, float: 'left' }}>
            {
              'စင်္ကာပူရောက် မြန်မာမိသားစု၏ လူမှုအခက်ခဲများ ကူညီစောင့်ရှောက်ရေးနှင့် ကောင်းမွန်သော လူ့ဘောင်ဘဝ မြှင့်တင်ထိန်းသိမ်းရေး'
            }
            <span style={{ marginLeft: 20 }}>Sub-Committee</span>
          </Checkbox>,
        )}
      </FormItem>
    </Col>
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_SPORT')(
          <Checkbox style={{ unicode, float: 'left' }}>
            {'မြန်မာ့အားကစားကဏ္ဍ ပံ့ပိုးကူညီရေး Sub-Committee'}
          </Checkbox>,
        )}
      </FormItem>
    </Col>
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_SPOSR')(
          <Checkbox style={{ unicode, float: 'left' }}>
            ရံပုံငွေရှာဖွေရေး Sub-Committee
          </Checkbox>,
        )}
      </FormItem>
    </Col>
    <Col>
      <FormItem style={{ marginBottom: 0 }}>
        {decorator('subComChk_OUTRH')(
          <Checkbox style={{ unicode, float: 'left' }}>
            သတင်းနှင့် ပြန်ကြားရေး Sub-Committee
          </Checkbox>,
        )}
      </FormItem>
    </Col>
  </FormItem>
);

// password

export const CreateAccount = ({
  decorator,
  changed,
  validateToNxtPwd,
  validatetoFirstPwd,
}) => (
  <FormItem {...layout} label=" " colon={false}>
    <Collapse onChange={changed}>
      <Panel header="Create a Myanmar Club Account...">
        <FormItem {...layout} label="Password">
          {decorator('pwInput', {
            rules: [
              {
                required: true,
                message: 'Please enter the password!',
              },
              {
                validator: validateToNxtPwd,
              },
            ],
          })(<FormInput type="password" />)}
        </FormItem>
        <FormItem {...layout} label="Confirm Password">
          {decorator('confirmPwInput', {
            rules: [
              {
                required: true,
                message: 'Please enter to confirm password!',
              },
              {
                validator: validatetoFirstPwd,
              },
            ],
          })(<FormInput type="password" />)}
        </FormItem>
        <Col xs={{ offset: 0 }} sm={{ offset: 8 }}>
          <Icon type="exclamation-circle-o" />
          <ExtraInfoText>
            {'The password must be at least 6 characters.'}
          </ExtraInfoText>
          <br />
          <Icon type="exclamation-circle-o" />
          <ExtraInfoText>
            {'It must contain at least one letter and one number.'}
          </ExtraInfoText>
          <br />
          <Icon type="exclamation-circle-o" />
          <ExtraInfoText> {'Passwords are case sensitive.'} </ExtraInfoText>
        </Col>
      </Panel>
    </Collapse>
  </FormItem>
);
