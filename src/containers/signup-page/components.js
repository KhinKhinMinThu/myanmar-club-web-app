import React from 'react';
import {
  Form,
  Radio,
  DatePicker,
  Select,
  Input,
  Upload,
  Checkbox,
  Table,
  Col,
} from 'antd';
import {
  CustomIcon,
  extraInfoStyles,
  radioStyle,
} from '../shared-components/common';
import { FormInput } from './styled-components';
import { DATE_FORMAT } from '../../actions/constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Option } = Select;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

export const unicode = { fontFamily: 'Myanmar3', fontSize: 14 };

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const customInput = { style: { width: '200px' } };
export const fieldWidth = { width: 200 };

// Name Input
export const NameInput = ({ decorator }) => (
  <FormItem {...formItemLayout} label="Name" colon required>
    <Col span="7">
      <FormItem>
        {decorator('firstName', {
          rules: [
            {
              required: true,
              message: 'Please input event address!',
            },
          ],
        })(<FormInput placeholder="First Name" />)}
      </FormItem>
    </Col>
    <Col span="7">
      <FormItem>
        {decorator('middleName')(<FormInput placeholder="Middle Name" />)}
      </FormItem>
    </Col>
    <Col span="8">
      <FormItem>
        {decorator('lastName')(<FormInput placeholder="Last Name" />)}
      </FormItem>
    </Col>
  </FormItem>
);

// Refreshment
export const GenderRadio = ({ decorator }) => (
  <FormItem {...formItemLayout} label="Gender" style={{ marginBottom: 0 }}>
    {decorator('gender', { rules: [{ initialValue: 'M' }] })(
      <RadioGroup name="gender">
        <RadioButton value="M">Male</RadioButton>
        <RadioButton value="F">Female</RadioButton>
      </RadioGroup>,
    )}
  </FormItem>
);

export const StartDateTimePicker = ({ decorator }) => (
  <FormItem {...formItemLayout} label="Date of Birth" colon required>
    {decorator('dateOfBirth', {
      rules: [
        {
          required: true,
          message: 'Please enter your date of birth!',
        },
      ],
    })(<DatePicker {...customInput} format={DATE_FORMAT} />)}
  </FormItem>
);

export const NationalityDdl = toClass((props) => {
  const { changed } = props;
  return (
    <Select style={fieldWidth} defaultValue="MM" onChange={changed}>
      <Option value="MM">Myanmar</Option>
      <Option value="SG">Singaporean</Option>
      <Option value="OT">Others</Option>
    </Select>
  );
});

export const ReligionDdl = toClass((props) => {
  const { changed } = props;
  return (
    <Select style={fieldWidth} placeholder="Select religion" onChange={changed}>
      <Option value="BU">Buddhism</Option>
      <Option value="IS">Islam</Option>
      <Option value="HI">Hinduism</Option>
      <Option value="CH">Christianity</Option>
      <Option value="OT">Others</Option>
    </Select>
  );
});
ReligionDdl.propTypes = { changed: PropTypes.func.isRequired };

export const mStatusDdl = (
  <Select style={fieldWidth} placeholder="Select marital status">
    <Option value="SI">Single</Option>
    <Option value="MA">Married</Option>
    <Option value="DI">Divorced</Option>
    <Option value="WI">Widowed</Option>
  </Select>
);

export const eduLvlInfo = (
  <span style={extraInfoStyles}>
    {'GCE A Level, Bachelor, Master, Doctoral (PhD) etc.'}
  </span>
);

export const sgPassDdl = (
  <Select style={fieldWidth} placeholder="Select pass type">
    <Option value="SP">S Pass</Option>
    <Option value="EP">Employment Pass</Option>
    <Option value="ST">Student Pass</Option>
    <Option value="CI">Citizen</Option>
    <Option value="PR">Permanent Resident</Option>
    <Option value="WP">Work Permit</Option>
  </Select>
);

export const PassNumInput = toClass((props) => {
  const { blurred } = props;
  return (
    <Input
      maxLength="9"
      style={fieldWidth}
      type="text"
      placeholder="NRIC/ FIN No."
      onBlur={blurred}
    />
  );
});
PassNumInput.propTypes = { blurred: PropTypes.func.isRequired };

export const passNumInfo = (
  <span style={extraInfoStyles}>S1234567Z, G1234567Z etc.</span>
);
// end

// ******************************* page2 signup components
// *******************************
export const addr1Input = (
  <Input
    style={{ width: 300 }}
    type="text"
    placeholder="Street Address Line 1"
  />
);
export const addr2Input = (
  <Input
    style={{ width: 300 }}
    type="text"
    placeholder="Street Address Line 2"
  />
);
export const ZipCodeInput = toClass((props) => {
  const { blurred } = props;
  return (
    <Input
      maxLength="6"
      style={fieldWidth}
      type="text"
      placeholder="Postal/ Zip Code"
      onBlur={blurred}
    />
  );
});
ZipCodeInput.propTypes = { blurred: PropTypes.func.isRequired };

export const pwInput = <Input style={fieldWidth} type="password" />;

export const ConfirmPwInput = toClass((props) => {
  const { changed } = props;
  return <Input style={fieldWidth} type="password" onChange={changed} />;
});
ConfirmPwInput.propTypes = { changed: PropTypes.func.isRequired };

export const pwInfo = (
  <div>
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      {'The password must be at least 6 characters.'}
    </span>
    <br />
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      {'It must contain at least one letter and one number.'}
    </span>
    <br />
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>Passwords are case sensitive.</span>
  </div>
);

export const areaCodeDdl = (
  <Select style={{ width: 70 }}>
    <Option value="65">+65</Option>
    <Option value="95">+95</Option>
  </Select>
);
export const HomeNoInput = toClass((props) => {
  const { blurred } = props;
  return (
    <Input
      style={{ width: 300 }}
      type="text"
      placeholder="Line Phone Number"
      onBlur={blurred}
    />
  );
});
HomeNoInput.propTypes = { blurred: PropTypes.func.isRequired };

export const MobileNoInput = toClass((props) => {
  const { blurred, areadCodeBef } = props;
  return (
    <Input
      style={{ width: 300 }}
      addonBefore={areadCodeBef}
      type="text"
      placeholder="Mobile Phone Number"
      onBlur={blurred}
    />
  );
});
MobileNoInput.propTypes = {
  blurred: PropTypes.func.isRequired,
  areadCodeBef: PropTypes.shape({}).isRequired,
};

export const hobbiesInput = <TextArea style={fieldWidth} rows={2} />;

const uploadButton = (
  <div>
    <CustomIcon type="plus" />
    <div className="ant-upload-text">Upload New Photo</div>
  </div>
);
export const UploadBtn = toClass((props) => {
  const { previewed, changed, fileList } = props;
  return (
    <Upload
      name="userpic"
      action=""
      listType="picture-card"
      onPreview={previewed}
      onChange={changed}
      fileList={fileList}
    >
      {fileList.length >= 2 ? null : uploadButton}
    </Upload>
  );
});
UploadBtn.propTypes = {
  previewed: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  fileList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const subComChkCutrl = (
  <Checkbox style={unicode}>
    {'မြန်မာ့ယဉ်ကျေးမှုအနုပညာ ထိန်းသိမ်းမြှင့်တင် ပျံ့ပွားရေး Sub-Committee'}
  </Checkbox>
);

export const subComChkKnwlg = (
  <Checkbox style={unicode}>
    {'စာပေ၊ ဗဟုသုတ၊ တတ်သိပညာ မြှင့်တင် ပျံ့ပွားရေး Sub-Committee'}
  </Checkbox>
);
export const subComChkComty = (
  <Checkbox style={unicode}>
    {
      'စင်္ကာပူရောက် မြန်မာမိသားစု၏ လူမှုအခက်ခဲများ ကူညီစောင့်ရှောက်ရေးနှင့် ကောင်းမွန်သော လူ့ဘောင်ဘဝ မြှင့်တင်ထိန်းသိမ်းရေး '
    }
    <br />
    <span style={{ marginLeft: 20 }}>Sub-Committee</span>
  </Checkbox>
);
export const subComChkSport = (
  <Checkbox style={unicode}>
    {'မြန်မာ့အားကစားကဏ္ဍ ပံ့ပိုးကူညီရေး Sub-Committee'}
  </Checkbox>
);
export const subComChkSposr = (
  <Checkbox style={unicode}>ရံပုံငွေရှာဖွေရေး Sub-Committee</Checkbox>
);
export const subComChkOutrh = (
  <Checkbox style={unicode}>သတင်းနှင့် ပြန်ကြားရေး Sub-Committee</Checkbox>
);
// end

// ******************************* page3 signup components
// *******************************
export const membershipTypeRdo = (
  <RadioGroup name="membershipTypeRdo">
    <Radio style={radioStyle} value="TYP1">
      {'Life '}
      <span style={unicode}>(ရာသက်ပန်) </span>
      {'SGD 350'}
    </Radio>
    <Radio style={radioStyle} value="TYP2">
      {'Singaporean/ PR/ EP Ordinary SGD 74 '}
      {'+ Member Card SGD 5 (1st time) = SGD 79'}
    </Radio>
    <Radio style={radioStyle} value="TYP3">
      {'Other Passes SGD 24 '}
      {'+ Member Card SGD 5 (1st time) = SGD 29'}
    </Radio>
    <Radio style={radioStyle} value="TYP4">
      {'Yearly Renewal Fees SGD 24 '}
      {'+ New Member Card SGD 5 = SGD 29'}
    </Radio>
    <Radio style={radioStyle} value="TYP5">
      {'6 month Fees SGD 12 '}
      {'(not entitled for Member Card / '}
      <span style={unicode}>အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)</span>
    </Radio>
  </RadioGroup>
);
export const PaymentTypeRdo = toClass((props) => {
  const { changed } = props;
  return (
    <RadioGroup name="paymentTypeRdo" defaultValue="DP" onChange={changed}>
      <RadioButton value="DP">Direct Online Payment</RadioButton>
      <RadioButton value="BT">Bank Transfer</RadioButton>
      <RadioButton value="CT">Cash Payment</RadioButton>
    </RadioGroup>
  );
});
PaymentTypeRdo.propTypes = { changed: PropTypes.func.isRequired };

export const declarationInfo = (
  <p style={{ lineHeight: 1.5 }}>
    <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
      {'Declaration by applicant '}
      <span style={unicode}>(လျှောက်ထားသူမှ ခံဝန်ချက်)</span>
    </span>
    <br />
    {
      'I declare that the above particulars given by me are true and correct and '
    }
    {'I agree to abide by the Constitution of the society.'}
    <br />
    <span style={unicode}>
      {'အထက်ဖော်ပြပါ မိမိ၏ ကိုယ်ရေးအချက်အလက်များသည် မှန်ကန်ပါသည်။'}
      {
        'မိမိသည် မြန်မာကလပ်(စင်္ကာပူ) အသင်း၏ ဖွဲ့စည်းပုံစည်းမျဉ်းများကို လိုက်နာပါမည်။'
      }
    </span>
  </p>
);
const declarationChkList = [
  {
    label: (
      <span>
        {'True and Correct '}
        <span style={unicode}>
          {'(ပေးပို့ထားသော ကိုယ်ရေးအချက်အလက်များမှာ မှန်ကန်ပါသည်)'}
        </span>
      </span>
    ),
    value: '1',
  },
  {
    label: (
      <span>
        {'I will abide by the Constitution of the Society '}
        <span style={unicode}>(အသင်း၏ စည်းမျဉ်းများကိုလိုက်နာပါမည်)</span>
      </span>
    ),
    value: '2',
  },
];
export const declarationChk = <CheckboxGroup options={declarationChkList} />;
export const contactInfo = (
  <p style={{ lineHeight: 1.5 }}>
    {'If you have any difficulties with online membership application, '}
    {'you are invited to come to Myanmar Club Office '}
    {'at Peninsula Plaza #05-42 from 13:00 to 19:00 hour on every Saturday.'}
    <br />
    <span style={unicode}>
      {
        'အကယ်၍ အွန်လိုင်းအသင်းဝင်ခွင့် လျှောက်ထားခြင်းနှင့် ပါတ်သက်၍ အခက်အခဲရှိပါက'
      }
      {'မြန်မာကလပ် ရုံးခန်း (ပင်နီဆူလာပလာဇာ၊ ၅ထပ် အခန်းအမှတ် ၄၁) သို့ '}
      {
        'စနေနေ့များတွင် နေ့လည် ၁နာရီမှ ညနေ ရနာရီအထိ ကိုယ်တိုင်လာရောက် ဆောင်ရွက်နိုင်ပါသည်။'
      }
    </span>
  </p>
);
// end

// ******************************* info page components
// *******************************

const columns = [
  { title: '', dataIndex: 'NA', align: 'right' },
  {
    title: 'Life',
    dataIndex: 'LI',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Ordinary',
    dataIndex: 'OR',
    align: 'right',
    width: '20%',
  },
  {
    title: 'Student/ Worker',
    dataIndex: 'SW',
    align: 'right',
    width: '30%',
  },
];

const data = [
  {
    key: '1',
    NA: 'Entrance Fee',
    LI: 'SGD 50',
    OR: 'SGD 50',
    SW: 'Waive',
  },
  {
    key: '2',
    NA: 'Annual Fee',
    LI: 'NA',
    OR: 'SGD 24',
    SW: 'SGD 24',
  },
  {
    key: '3',
    NA: 'The Member',
    LI: 'SGD 300',
    OR: 'NA',
    SW: 'NA',
  },
  {
    key: '4',
    NA: 'Total',
    LI: 'SGD 350',
    OR: 'SGD 74',
    SW: 'SGD 24',
  },
];
export const feesTbl = (
  <Table
    style={{ border: '1px solid black' }}
    columns={columns}
    dataSource={data}
    pagination={false}
    size="small"
    bordered
  />
);
