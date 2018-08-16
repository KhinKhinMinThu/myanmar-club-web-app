import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import {
  Form, Alert, Row, Col, Spin, Card,
} from 'antd';
import FormStepAction from './form-step-action';
import {
  DATETIME_FORMAT_DB,
  NATIONALITY_LIST,
  RELIGION_LIST,
} from '../../../actions/constants';
import {
  NameInput,
  GenderRadio,
  DateOfBirthInput,
  MaritalStatusSelect,
  EducationLevelInput,
  OccupationInput,
  PassTypeSelect,
  IdNumberInput,
  AddressInput,
  PostalCodeInput,
  EmailAddressInput,
  FacebookAccountInput,
  HomePhoneInput,
  MobilePhoneInput,
  HobbiesInput,
  SubComInterest,
  ProfilePhoto,
} from '../../shared-profile-components/shared-components';
import NationalityInput from '../../shared-profile-components/nationalityInput';
import ReligionInput from '../../shared-profile-components/religionInput';
import PasswordInput from '../../shared-profile-components/passwordInput';
import { next } from '../../../reducers/membermgmt/membermgmt-ui';
import {
  getMemberFormFields,
  setMemberData,
} from '../../../reducers/membermgmt/membermgmt-data';

class Page1 extends Component {
  state = {
    fileList: [],
  };

  componentDidMount() {
    const { performGetMemberFormFields } = this.props;
    performGetMemberFormFields();
  }

  componentWillUpdate(nextProps) {
    const {
      membermgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.membermgmtData.isGetApiLoading && isGetApiLoading;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatchMemberData,
      dispatchNext,
    } = this.props;

    const { fileList } = this.state;

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formValues = values;
        const dateOfBirth = this.formatDateTime(formValues.dateOfBirth);
        const homePhone = formValues.homePhone
          ? formValues.areaCodeHomePhone + formValues.homePhone
          : formValues.homePhone;
        const mobilePhone = formValues.mobilePhone
          ? formValues.areaCodeMobilePhone + formValues.mobilePhone
          : formValues.mobilePhone;
        const nationality = formValues.nationality === 'Others'
          ? formValues.otherNationality
          : formValues.nationality;
        const religion = formValues.religion === 'Others'
          ? formValues.otherReligion
          : formValues.religion;
        const subComInterest = [];
        Object.entries(formValues).forEach((item) => {
          if (item[0].includes('subComChk') && item[1]) {
            subComInterest.push({ id: item[0].slice(-1) });
          }
        });
        // encryp the password if it's changed.
        const password = formValues.password
          ? CryptoJS.MD5(formValues.password).toString(CryptoJS.enc.Hex)
          : '';
        const memberToAdd = {
          ...formValues,
          dateOfBirth,
          homePhone,
          mobilePhone,
          nationality,
          religion,
          subComInterest,
          password,
          uploadBtn: fileList,
        };
        dispatchMemberData(memberToAdd);
        dispatchNext();
        document.documentElement.scrollTop = 0;
      }
    });
  };

  beforeUpload = (file) => {
    // one file only
    if (file) {
      this.setState({ fileList: [file] });
    }
  };

  removeFile = (file) => {
    // one file only
    if (file) {
      this.setState({ fileList: [] });
    }
  };

  // convert string date to Date object
  formatDateTime = strDate => moment(new Date(strDate)).format(DATETIME_FORMAT_DB);

  render() {
    const {
      form,
      form: { getFieldDecorator },
      membermgmtData: { isGetApiLoading, getErrMsg, memberFormFields },
    } = this.props;
    const layout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
    };
    // const isOtherNat = getFieldValue('isOtherNat');
    // const isOtherRel = getFieldValue('isOtherRel');
    const allSubComInterest = memberFormFields
      ? memberFormFields.allSubComInterest
      : [];

    return (
      <Spin spinning={isGetApiLoading} size="large" delay={1000}>
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <Form onSubmit={this.onSubmit}>
            <Row type="flex" gutter={8} justify="start">
              <Col {...layout}>
                <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                  <NameInput decorator={getFieldDecorator} />
                  <GenderRadio decorator={getFieldDecorator} />
                  <DateOfBirthInput decorator={getFieldDecorator} />
                  <NationalityInput
                    form={form}
                    decorator={getFieldDecorator}
                    // isOtherNat={isOtherNat}
                  />
                  <ReligionInput
                    form={form}
                    decorator={getFieldDecorator}
                    // isOtherRel={isOtherRel}
                  />
                </Card>
              </Col>
              <Col {...layout}>
                <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                  <MaritalStatusSelect decorator={getFieldDecorator} />
                  <EducationLevelInput decorator={getFieldDecorator} />
                  <OccupationInput decorator={getFieldDecorator} />
                  <PassTypeSelect decorator={getFieldDecorator} />
                  <IdNumberInput decorator={getFieldDecorator} />
                </Card>
              </Col>
            </Row>
            <Row gutter={8} justify="start">
              <Col span={24}>
                <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                  <ProfilePhoto
                    decorator={getFieldDecorator}
                    beforeUpload={this.beforeUpload}
                    removeFile={this.removeFile}
                  />
                  <AddressInput decorator={getFieldDecorator} />
                  <PostalCodeInput decorator={getFieldDecorator} />
                  <EmailAddressInput decorator={getFieldDecorator} />
                  <PasswordInput
                    decorator={getFieldDecorator}
                    form={form}
                    placeHolder="Account Password"
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                  <FacebookAccountInput decorator={getFieldDecorator} />
                  <HomePhoneInput decorator={getFieldDecorator} />
                  <MobilePhoneInput decorator={getFieldDecorator} />
                  <HobbiesInput decorator={getFieldDecorator} />
                  <SubComInterest
                    decorator={getFieldDecorator}
                    allSubComInterest={allSubComInterest}
                  />
                </Card>
              </Col>
            </Row>
            <FormStepAction />
          </Form>
        )}
      </Spin>
    );
  }
}

Page1.propTypes = {
  form: PropTypes.shape({}).isRequired,
  performGetMemberFormFields: PropTypes.func.isRequired,
  dispatchMemberData: PropTypes.func.isRequired,
  dispatchNext: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  performGetMemberFormFields: getMemberFormFields,
  dispatchMemberData: setMemberData,
  dispatchNext: next,
};

const mapPropsToFields = ({ membermgmtData: { memberData } }) => {
  const member = memberData || {};
  let isOtherNat;
  let isOtherRel;
  let nationality = 'Myanmar';
  let religion = 'Buddhism';
  const subComInterest = {};
  if (memberData) {
    isOtherNat = NATIONALITY_LIST.includes(member.nationality.toLowerCase())
      ? 't'
      : 'f';
    isOtherRel = RELIGION_LIST.includes(member.religion.toLowerCase())
      ? 't'
      : 'f';
    member.subComInterest.forEach((item) => {
      subComInterest['subComChk'.concat(item.id)] = Form.createFormField({
        value: true,
      });
    });
    nationality = isOtherNat === 't' ? member.nationality : 'Others';
    religion = isOtherRel === 't' ? member.religion : 'Others';
    // member.subComInterest.map{ subComChk1: Form.createFormField({ value: true }), subComChk2: Form.createFormField({ value: true }) };
  }

  // return the fields
  return {
    uploadBtn: Form.createFormField({
      value: member.uploadBtn ? [member.uploadBtn[0]] : [],
    }),
    id: Form.createFormField({ value: member.id }),
    name: Form.createFormField({ value: member.name }),
    gender: Form.createFormField({
      value: member.gender ? member.gender : 'Male',
    }),
    dateOfBirth: Form.createFormField({
      value: member.dateOfBirth ? moment(new Date(member.dateOfBirth)) : null,
    }),
    // Nationality
    nationality: Form.createFormField({
      value: nationality,
    }),
    otherNationality: Form.createFormField({
      value: isOtherNat === 't' ? '' : member.nationality,
    }),
    // isOtherNat: Form.createFormField({ value: isOtherNat }),
    // end Nationality

    // Religion
    religion: Form.createFormField({
      value: religion,
    }),
    otherReligion: Form.createFormField({
      value: isOtherRel === 't' ? '' : member.religion,
    }),
    // isOtherRel: Form.createFormField({ value: isOtherRel }),
    // end Religion

    maritalStatus: Form.createFormField({
      value: member.maritalStatus ? member.maritalStatus : 'Single',
    }),
    educationLevel: Form.createFormField({
      value: member.educationLevel,
    }),
    occupation: Form.createFormField({ value: member.occupation }),
    passType: Form.createFormField({ value: member.passType }),
    idNumber: Form.createFormField({ value: member.idNumber }),
    addressLine1: Form.createFormField({ value: member.addressLine1 }),
    addressLine2: Form.createFormField({ value: member.addressLine2 }),
    postalCode: Form.createFormField({ value: member.postalCode }),
    emailAddress: Form.createFormField({ value: member.emailAddress }),
    password: Form.createFormField({
      value: member.password ? member.password : '',
    }),
    confirmPassword: Form.createFormField({
      value: member.password ? member.password : '',
    }),
    facebookAccount: Form.createFormField({
      value: member.facebookAccount,
    }),
    areaCodeHomePhone: Form.createFormField({
      value: member.homePhone ? member.homePhone.substr(0, 2) : '65',
    }),
    homePhone: Form.createFormField({
      value: member.homePhone ? member.homePhone.substr(2) : member.homePhone,
    }),
    areaCodeMobilePhone: Form.createFormField({
      value: member.mobilePhone ? member.mobilePhone.substr(0, 2) : '65',
    }),
    mobilePhone: Form.createFormField({
      value: member.mobilePhone
        ? member.mobilePhone.substr(2)
        : member.mobilePhone,
    }),
    hobbies: Form.createFormField({ value: member.hobbies }),
    ...subComInterest,
  };
};
const FormPage1 = Form.create({ mapPropsToFields })(Page1);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage1);
