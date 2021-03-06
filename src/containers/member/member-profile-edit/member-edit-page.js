import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Spin, Modal, Card, BackTop, Tooltip,
} from 'antd';
import {
  SUCCESS_UPDATEMEMBER,
  CONFIRM_DELETEMEMBER,
} from '../../../actions/message';
import {
  DATETIME_FORMAT_DB,
  NATIONALITY_LIST,
  RELIGION_LIST,
} from '../../../actions/constants';
import {
  IdReadOnly,
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
  IsEcMemberRadio,
  SubComInterest,
  ProfilePhoto,
  DeleteProfileSwitch,
} from '../../shared-profile-components/shared-components';
import { RoleInput, SaveUpdateButton, BackButton } from './components';
import NationalityInput from '../../shared-profile-components/nationalityInput';
import ReligionInput from '../../shared-profile-components/religionInput';
import PasswordInput from '../../shared-profile-components/passwordInput';
import {
  postDeleteMembers,
  postUpdateMember,
  setMemberData,
} from '../../../reducers/membermgmt/membermgmt-data';

class MemberEdit extends Component {
  state = {
    fileList: [],
  };

  componentDidUpdate(prevProps) {
    const {
      history,
      membermgmtData: { isPostApiLoading, postErrMsg, isEmailFound },
      membermgmtUI: { currentTab },
      form: { setFields, getFieldValue },
    } = this.props;

    if (currentTab !== 'tab1') return;

    const isApiPost = prevProps.membermgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) Modal.error({ title: 'Error!', content: postErrMsg });
    if (!postErrMsg) {
      Modal.success({ title: 'Success!', content: SUCCESS_UPDATEMEMBER });
      if (this.actionType === 'delete') history.go(-1);
    }
    this.actionType = 'update';
    if (isEmailFound === '1') {
      setFields({
        emailAddress: {
          value: getFieldValue('emailAddress'),
          errors: [
            new Error(
              'Email address already exists! Please choose a different email!',
            ),
          ],
        },
      });
    }
  }

  onChange = (e) => {
    const { value } = e.target;
    const {
      form: { setFieldsValue },
    } = this.props;
    if (value === '0') {
      setFieldsValue({ roleNames: [] });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      membermgmtData: { memberData },
      computedMatch: {
        params: { id },
      },
      performUpdateMember,
      performDeleteMembers,
      dispatchMemberData,
    } = this.props;

    const { fileList } = this.state;

    // if user selects to delete member, it will be deleted without
    // updating the rest of the data even if the user changed anything else.

    if (getFieldValue('deleteProfile')) {
      this.actionType = 'delete';
      Modal.confirm({
        title: 'Confirmation!',
        content: CONFIRM_DELETEMEMBER,
        onOk() {
          performDeleteMembers({ membersToDelete: [id] });
        },
      });
    } else {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          const formValues = values;
          console.log(formValues);
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
          const roleNames = [];
          formValues.roleNames.forEach(item => roleNames.push({ id: item }));
          // encryp the password if it's changed.
          let password = '';
          if (formValues.password) {
            password = memberData.password !== formValues.password
              ? CryptoJS.MD5(formValues.password).toString(CryptoJS.enc.Hex)
              : memberData.password;
          }
          const memberToUpdate = {
            ...formValues,
            id,
            dateOfBirth,
            homePhone,
            mobilePhone,
            nationality,
            religion,
            subComInterest,
            roleNames,
            password,
            uploadBtn: fileList,
            photoLink: getFieldValue('photoLink'),
          };
          dispatchMemberData({ ...memberData, ...memberToUpdate });
          performUpdateMember(memberToUpdate);
        }
      });
    }
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
      history,
      form,
      form: { getFieldDecorator },
      membermgmtData: { isPostApiLoading, memberFormFields },
      loginData: { roleIdList },
    } = this.props;
    const layout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
    };
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };

    // const isOtherNat = getFieldValue('isOtherNat');
    // const isOtherRel = getFieldValue('isOtherRel');
    const allSubComInterest = memberFormFields
      ? memberFormFields.allSubComInterest
      : [];
    const allRoles = memberFormFields ? memberFormFields.allRoles : [];
    const disabled = !roleIdList.includes(1);

    return (
      <Spin spinning={isPostApiLoading} size="large" delay={1000}>
        <Form onSubmit={this.onSubmit}>
          <Tooltip title="Click to go back to the top">
            <BackTop />
          </Tooltip>
          <Row gutter={8} justify="start">
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <IdReadOnly decorator={getFieldDecorator} />
              </Card>
            </Col>
          </Row>
          <Row gutter={8} justify="start">
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
            <Col span={24}>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <IsEcMemberRadio
                  decorator={getFieldDecorator}
                  onChange={this.onChange}
                  disabled={disabled}
                />
                <RoleInput
                  form={form}
                  decorator={getFieldDecorator}
                  allRoles={allRoles}
                  disabled={disabled}
                />
              </Card>
              <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
                <DeleteProfileSwitch decorator={getFieldDecorator} />
                <br />
                <Row gutter={8}>
                  <Col {...actionColLayout}>
                    <SaveUpdateButton />
                  </Col>
                  <Col {...actionColLayout}>
                    <BackButton history={history} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

MemberEdit.propTypes = {
  history: PropTypes.shape({}).isRequired,
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performUpdateMember: PropTypes.func.isRequired,
  performDeleteMembers: PropTypes.func.isRequired,
  dispatchMemberData: PropTypes.func.isRequired,

  membermgmtUI: PropTypes.shape({}).isRequired,
  membermgmtData: PropTypes.shape({}).isRequired,
  loginData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtUI: state.membermgmt.ui,
  membermgmtData: state.membermgmt.data,
  loginData: state.login.data,
});

const mapDispatchToProps = {
  performUpdateMember: postUpdateMember,
  performDeleteMembers: postDeleteMembers,
  dispatchMemberData: setMemberData,
};

const mapPropsToFields = ({ membermgmtData: { memberData } }) => {
  const member = memberData || {};
  let isOtherNat;
  let isOtherRel;
  const subComInterest = {};
  const roleNames = [];
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
    member.roleNames.forEach((item) => {
      roleNames.push(item.id);
    });
    // member.subComInterest.map{ subComChk1: Form.createFormField({ value: true }), subComChk2: Form.createFormField({ value: true }) };
  }

  // return the fields
  return {
    uploadBtn: Form.createFormField({
      value: member.photoLink
        ? [{ type: 'image/jpeg', uid: member.id, url: member.photoLink }]
        : [],
    }),
    photoLink: Form.createFormField({ value: member.photoLink }),
    id: Form.createFormField({ value: member.id }),
    name: Form.createFormField({ value: member.name }),
    gender: Form.createFormField({ value: member.gender }),
    dateOfBirth: Form.createFormField({
      value: moment(new Date(member.dateOfBirth)),
    }),
    // Nationality
    nationality: Form.createFormField({
      value: isOtherNat === 't' ? member.nationality : 'Others',
    }),
    otherNationality: Form.createFormField({
      value: isOtherNat === 't' ? '' : member.nationality,
    }),
    // isOtherNat: Form.createFormField({ value: isOtherNat }),
    // end Nationality

    // Religion
    religion: Form.createFormField({
      value: isOtherRel === 't' ? member.religion : 'Others',
    }),
    otherReligion: Form.createFormField({
      value: isOtherRel === 't' ? '' : member.religion,
    }),
    // isOtherRel: Form.createFormField({ value: isOtherRel }),
    // end Religion

    maritalStatus: Form.createFormField({ value: member.maritalStatus }),
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
      value: member.mobilePhone
        ? member.mobilePhone.substr(0, 2)
        : member.mobilePhone,
    }),
    mobilePhone: Form.createFormField({
      value: member.mobilePhone
        ? member.mobilePhone.substr(2)
        : member.mobilePhone,
    }),
    hobbies: Form.createFormField({ value: member.hobbies }),
    ...subComInterest,
    isEcMember: Form.createFormField({
      value: member.isEcMember,
    }),
    roleNames: Form.createFormField({ value: roleNames }),
  };
};

const FormMemberEditPage = Form.create({ mapPropsToFields })(MemberEdit);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormMemberEditPage));
