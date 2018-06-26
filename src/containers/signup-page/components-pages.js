import React from "react";
import {
  Radio,
  Button,
  DatePicker,
  Select,
  Input,
  Upload,
  Checkbox,
  Table
} from "antd";
import {
  CustomIcon,
  FullWidthButton,
  monthFormat,
  dateFormat,
  extraInfoStyles,
  radioStyle
} from "../shared-components/common";
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;
const TextArea = Input.TextArea;
const MonthPicker = DatePicker.MonthPicker;
const CheckboxGroup = Checkbox.Group;

export const cardStyles = {
      borderRadius: 10,
  textAlign: "left"
};
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
export const fieldWidth = { width: 200 };
export const otherInput = <Input style={fieldWidth} type="text" />;

// ******************************* page1 components
// *******************************
export const name1Input = (
  <Input style={fieldWidth} type="text" placeholder="First Name" />
);
export const name2Input = (
  <Input style={fieldWidth} type="text" placeholder="Middle Name" />
);
export const name3Input = (
  <Input style={fieldWidth} type="text" placeholder="Last Name" />
);
export const genderRdo = (
  <RadioGroup name="genderRdo">
    <RadioButton value="M">Male</RadioButton>
    <RadioButton value="F">Female</RadioButton>
  </RadioGroup>
);
export const dobInput = <DatePicker style={fieldWidth} format={dateFormat} />;
export class NationalityDdl extends React.Component {
  render() {
    return (
      <Select
        style={fieldWidth}
        defaultValue="MM"
        onChange={this.props.changed}
      >
        <Option value="MM">Myanmar</Option>
        <Option value="SG">Singaporean</Option>
        <Option value="OT">Others</Option>
      </Select>
    );
  }
}
export class ReligionDdl extends React.Component {
  render() {
    return (
      <Select
        style={fieldWidth}
        placeholder="Select religion"
        onChange={this.props.changed}
      >
        <Option value="BU">Buddhism</Option>
        <Option value="IS">Islam</Option>
        <Option value="HI">Hinduism</Option>
        <Option value="CH">Christianity</Option>
        <Option value="OT">Others</Option>
      </Select>
    );
  }
}
export const mStatusDdl = (
  <Select style={fieldWidth} placeholder="Select marital status">
    <Option value="SI">Single</Option>
    <Option value="MA">Married</Option>
    <Option value="DI">Divorced</Option>
    <Option value="WI">Widowed</Option>
  </Select>
);

export const eduLvlInput = (
  <Input style={fieldWidth} type="text" placeholder="Education Level" />
);
export const eduLvlInfo = (
  <span style={extraInfoStyles}>
    GCE A Level, Bachelor, Master, Doctoral (PhD) etc.
  </span>
);
export const occupationInput = (
  <Input style={fieldWidth} type="text" placeholder="Job Title" />
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

export class PassNumInput extends React.Component {
  render() {
    return (
      <Input
        style={fieldWidth}
        type="text"
        placeholder="NRIC/ FIN No."
        onBlur={this.props.blurred}
      />
    );
  }
}
export const passNumInfo = (
  <span style={extraInfoStyles}>S1234567Z, G1234567Z etc.</span>
);
//end

// ******************************* page2 components
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
export class ZipCodeInput extends React.Component {
  render() {
    return (
      <Input
        maxLength="6"
        style={fieldWidth}
        type="text"
        placeholder="Postal/ Zip Code"
        onBlur={this.props.blurred}
      />
    );
  }
}
export const emailInput = (
  <Input style={fieldWidth} type="text" placeholder="Email Address" />
);
export const pwInput = <Input type="password" />;

export class ConfirmPwInput extends React.Component {
  render() {
    return <Input type="password" onChange={this.props.changed} />;
  }
}
export const pwInfo = (
  <div>
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      The password must be at least 6 characters.
    </span>
    <br />
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>
      It must contain at least one letter and one number.
    </span>
    <br />
    <CustomIcon type="exclamation-circle-o" />
    <span style={extraInfoStyles}>Passwords are case sensitive.</span>
  </div>
);

export const fbAccInput = (
  <Input style={fieldWidth} type="text" placeholder="Facebook Profile Link" />
);
export const areaCodeDdl = (
  <Select style={{ width: 70 }}>
    <Option value="65">+65</Option>
    <Option value="95">+95</Option>
  </Select>
);
export class HomeNoInput extends React.Component {
  render() {
    return (
      <Input
        style={{ width: 300 }}
        type="text"
        placeholder="Line Phone Number"
        onBlur={this.props.blurred}
      />
    );
  }
}
export class MobileNoInput extends React.Component {
  render() {
    return (
      <Input
        style={{ width: 300 }}
        addonBefore={this.props.areadCodeBef}
        type="text"
        placeholder="Mobile Phone Number"
        onBlur={this.props.blurred}
      />
    );
  }
}
export const hobbiesInput = <TextArea style={fieldWidth} rows={2} />;

export const uploadBtn = (
  // need to change action </upload.do> or something
  <Upload name="userpic" action="" listType="picture">
    <Button>
      <CustomIcon type="upload" /> Click to upload
    </Button>
  </Upload>
);

export const subComChk_CUTRL = (
  <Checkbox>
    ၿမန္မာ့ယဥ္ေက်းမႈအနုပညာ ထိန္းသိမ္းၿမွင့္တင္ ပ်ံ႕ပြားေရး Sub-Committee
  </Checkbox>
);
export const subComChk_KNWLG = (
  <Checkbox>
    စာေပ၊ ဗဟုသုတ၊ တတ္သိပညာ ၿမွင့္တင္ ပ်ံ႕ပြားေရး Sub-Committee
  </Checkbox>
);
export const subComChk_COMTY = (
  <Checkbox>
    စကၤာပူေရာက္ၿမန္မာမိသားစု၏ လူမႈအခက္အခဲမ်ားကူညီေစာင့္ေရွာက္ေရးႏွင့္
    ေကာင္းမြန္ေသာ လူ႕ေဘာင္ဘဝ ၿမွင့္တင္ထိန္းသိမ္းေရး Sub-Committee
  </Checkbox>
);
export const subComChk_SPORT = (
  <Checkbox>ၿမန္မာ့အားကစားက႑ ပံ့ပိုးကူညီေရး Sub-Committee</Checkbox>
);
export const subComChk_SPOSR = (
  <Checkbox>ရံပံုေငြရွာေဖြေရး Sub-Committee</Checkbox>
);
export const subComChk_OUTRH = (
  <Checkbox>သတင္းႏွင့္ ၿပန္ၾကားေရး Sub-Committee</Checkbox>
);

//end

// ******************************* page3 components
// *******************************
export const membershipTypeRdo = (
  <RadioGroup name="membershipTypeRdo">
    <Radio style={radioStyle} value="TYP1">
      Life (ရာသက္ပန္) <b>SGD 350</b>
    </Radio>
    <Radio style={radioStyle} value="TYP2">
      Singaporean/ PR/ EP Ordinary <b>SGD 74</b> + Member Card <b>SGD 5</b> (1st
      time) =
      <b>SGD 79</b>
    </Radio>
    <Radio style={radioStyle} value="TYP3">
      Other Passes <b>SGD 24</b> + Member Card <b>SGD 5</b> (1st time) =
      <b>SGD 29</b>
    </Radio>
    <Radio style={radioStyle} value="TYP4">
      Yearly Renewal Fees <b>SGD 24</b> + New Member Card <b>SGD 5</b> =
      <b>SGD 29</b>
    </Radio>
    <Radio style={radioStyle} value="TYP5">
      6 month Fees <b>SGD 12</b> (not entitled for Member Card / အသင္းဝင္ကဒ္ရမည္
      မဟုတ္ပါ)
    </Radio>
  </RadioGroup>
);
export class PaymentTypeRdo extends React.Component {
  render() {
    return (
      <RadioGroup
        name="paymentTypeRdo"
        defaultValue="DP"
        onChange={this.props.changed}
      >
        <RadioButton value="DP">Direct Online Payment</RadioButton>
        <RadioButton value="BT">Bank Transfer</RadioButton>
        <RadioButton value="CT">Cash Payment</RadioButton>
      </RadioGroup>
    );
  }
}

export const declarationInfo = (
  <p style={{ lineHeight: 1.5 }}>
    <u>
      <b>Declaration by applicant (ေလွ်ာက္ထားသူမွ ခံဝန္ခ်က္) </b>
    </u>
    <br />
    I declare that the above particulars given by me are true and correct and I
    agree to abide by the Constitution of the society.
    <br />
    အထက္ေဖာ္ၿပပါ မိမိ၏ ကိုယ္ေရးအခ်က္အလက္မ်ားသည္ မွန္ကန္ပါသည္။ မိမိသည္
    ၿမန္မာကလပ္(စကၤာပူ) အသင္း၏ ဖြဲ႕စည္းပံုစည္းမ်ဥ္းမ်ားကို လိုက္နာပါမည္။
  </p>
);
const declarationChkList = [
  {
    label:
      "True and Correct ( ေပးပို႕ထားေသာ ကိုယ္ေရးအခ်က္အလက္မ်ားမွာ မွန္ကန္ပါသည္)",
    value: "1"
  },
  {
    label:
      "I will abide by the Constitution of the Society (အသင္း၏ စည္းမ်ဥ္းမ်ားကိုလိုက္နာပါမည္)",
    value: "2"
  }
];
export const declarationChk = <CheckboxGroup options={declarationChkList} />;
export const contactInfo = (
  <p style={{ lineHeight: 1.5 }}>
    If you have any difficulties with online membership application, you are
    invited to come to Myanmar Club Office at Peninsula Plaza #05-42 from 13:00
    to 19:00 hour on every Saturday.
    <br />
    အကယ္၍ အြန္လိုင္းအသင္းဝင္ခြင့္ ေလွ်ာက္ထားၿခင္းႏွင့္ ပါတ္သက္၍ အခက္အခဲရွိပါက
    ၿမန္မာကလပ္ ရံုးခန္း (ပင္နီဆူလာပလာဇာ၊ ၅ထပ္ အခန္းအမွတ္ ၄၁) သို႕ စေနေန႕မ်ားတြင္
    ေန႕လည္ ၁နာရီမွ ညေန ၇နာရီအထိ ကိုယ္တိုင္လာေရာက္ ေဆာင္ရြက္ႏိုင္ပါသည္။
  </p>
);
//end

// ******************************* credinfo-form components
// *******************************
export const cardExpInput = (
  <MonthPicker
    style={fieldWidth}
    format={monthFormat}
    placeholder="Select month and year"
  />
);
export class CardNumInput extends React.Component {
  render() {
    return (
      <Input
        maxLength="16"
        type="text"
        style={fieldWidth}
        onBlur={this.props.blurred}
      />
    );
  }
}
export const cardNumInfo = (
  <span style={extraInfoStyles}>Do not include space or dashes "-".</span>
);
export const cardExpInfo = <span style={extraInfoStyles}>MM-YYYY</span>;
export class CardSecInput extends React.Component {
  render() {
    return (
      <Input
        maxLength="4"
        type="text"
        style={fieldWidth}
        onBlur={this.props.blurred}
      />
    );
  }
}

export class PaymentBtn extends React.Component {
  render() {
    return (
      <FullWidthButton type="primary" onClick={this.props.clicked}>
        Make Payment Now
      </FullWidthButton>
    );
  }
}
//end

// ******************************* info components
// *******************************
//endimport { Table, Icon, Divider } from 'antd';

const columns = [
  { title: "", dataIndex: "NA", align: "right" },
  { title: "Life", dataIndex: "LI", align: "right", width: "20%" },
  { title: "Ordinary", dataIndex: "OR", align: "right", width: "20%" },
  { title: "Student/ Worker", dataIndex: "SW", align: "right", width: "20%" }
];

const data = [
  {
    key: "1",
    NA: "Entrance Fee",
    LI: "SGD 50",
    OR: "SGD 50",
    SW: "Waive"
  },
  {
    key: "2",
    NA: "Annual Fee",
    LI: "NA",
    OR: "SGD 24",
    SW: "SGD 24"
  },
  {
    key: "3",
    NA: "The Member",
    LI: "SGD 300",
    OR: "NA",
    SW: "NA"
  },
  {
    key: "4",
    NA: "Total",
    LI: "SGD 350",
    OR: "SGD 74",
    SW: "SGD 24"
  }
];
export const feesTbl = (
  <Table
    style={{ border: "1px solid black" }}
    columns={columns}
    dataSource={data}
    pagination={false}
    size="small"
    bordered={true}
  />
);
//end
