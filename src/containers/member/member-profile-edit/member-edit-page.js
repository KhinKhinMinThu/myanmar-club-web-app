import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col, Spin, Modal,
} from 'antd';
import {
  SUCCESS_UPDATEMEMBER,
  CONFIRM_DELETEMEMBER,
  SHOWFOR,
} from '../../../actions/message';
import { DATETIME_FORMAT_DB, DATE_FORMAT } from '../../../actions/constants';
import {
  SaveUpdateButton,
  BackButton,
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
} from './components';
import { ProfileCard } from '../shared-styled';
import {
  postDeleteMembers,
  postUpdateMember,
} from '../../../reducers/membermgmt/membermgmt-data';

const { confirm } = Modal;

class MemberEdit extends Component {
  state = {
    fileList: [],
  };

  componentWillMount() {
    console.log('willMount');
  }

  componentWillReceiveProps() {
    console.log('receiveprop');
  }

  componentWillUpdate() {
    const {
      membermgmtData: { memberData },
    } = this.props;
    // this.isApiCalled = !nextProps.membermgmtData.isGetApiLoading && isGetApiLoading;
    console.log('willupdate', memberData);
  }

  componentDidUpdate(prevProps) {
    console.log('didupdate');
    const {
      membermgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.membermgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_UPDATEMEMBER, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      computedMatch: {
        params: { id },
      },
      performUpdateMember,
      performDeleteMembers,
    } = this.props;

    const { fileList } = this.state;

    // if user selects to delete member, it will be deleted without
    // updating the rest of the data even if the user changed anything else.
    if (getFieldValue('deleteMember')) {
      confirm({
        title: CONFIRM_DELETEMEMBER,
        onOk() {
          performDeleteMembers({ membersToDelete: [id] });
        },
        // onCancel() {
        //   console.log('Cancel');
        // },
      });
    } else {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          const formValues = values;
          const dateOfBirth = this.formatDateTime(formValues.dateOfBirth);
          const homePhone = formValues.homePhone
            ? formValues.areaCode + formValues.homePhone
            : formValues.homePhone;
          const mobilePhone = formValues.mobilePhone
            ? formValues.areaCode + formValues.mobilePhone
            : formValues.mobilePhone;

          performUpdateMember({
            ...formValues,
            id,
            dateOfBirth,
            homePhone,
            mobilePhone,
            uploadBtn: fileList,
          });
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
      form: { getFieldDecorator },
      membermgmtData: { isPostApiLoading },
    } = this.props;
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };
    return (
      <Spin spinning={isPostApiLoading} size="large">
        <Form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
          <ProfileCard style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
            <IdReadOnly decorator={getFieldDecorator} />
            <NameInput decorator={getFieldDecorator} />
            <GenderRadio decorator={getFieldDecorator} />
            <DateOfBirthInput decorator={getFieldDecorator} />
            <MaritalStatusSelect decorator={getFieldDecorator} />
            <EducationLevelInput decorator={getFieldDecorator} />
            <OccupationInput decorator={getFieldDecorator} />
            <PassTypeSelect decorator={getFieldDecorator} />
            <IdNumberInput decorator={getFieldDecorator} />
            <AddressInput decorator={getFieldDecorator} />
            <PostalCodeInput decorator={getFieldDecorator} />
            <EmailAddressInput decorator={getFieldDecorator} />
            <FacebookAccountInput decorator={getFieldDecorator} />
            <HomePhoneInput decorator={getFieldDecorator} />
            <MobilePhoneInput decorator={getFieldDecorator} />
            <HobbiesInput decorator={getFieldDecorator} />
            <IsEcMemberRadio decorator={getFieldDecorator} />

            <br />
            <Row gutter={8}>
              <Col {...actionColLayout}>
                <SaveUpdateButton />
              </Col>
              <Col {...actionColLayout}>
                <BackButton />
              </Col>
            </Row>
          </ProfileCard>
        </Form>
      </Spin>
    );
  }
}

MemberEdit.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performUpdateMember: PropTypes.func.isRequired,
  performDeleteMembers: PropTypes.func.isRequired,

  membermgmtData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  performUpdateMember: postUpdateMember,
  performDeleteMembers: postDeleteMembers,
};

const mapPropsToFields = ({ membermgmtData: { memberData } }) => {
  console.log('mapprop', memberData);
  if (memberData) {
    console.log('TRUE', memberData);
    return {
      uploadBtn: Form.createFormField({
        value: memberData.photoLink
          ? [{ uid: memberData.id, url: memberData.photoLink }]
          : [],
      }),
      name: Form.createFormField({ value: memberData.name }),
      gender: Form.createFormField({ value: memberData.gender }),
      dateOfBirth: Form.createFormField({
        value: moment(new Date(memberData.dateOfBirth)).format(DATE_FORMAT),
      }),
      nationality: Form.createFormField({ value: memberData.nationality }),
      religion: Form.createFormField({ value: memberData.religion }),
      maritalStatus: Form.createFormField({ value: memberData.maritalStatus }),
      educationLevel: Form.createFormField({
        value: memberData.educationLevel,
      }),
      occupation: Form.createFormField({ value: memberData.occupation }),
      passType: Form.createFormField({ value: memberData.passType }),
      idNumber: Form.createFormField({ value: memberData.idNumber }),
      addressLine1: Form.createFormField({ value: memberData.addressLine1 }),
      addressLine2: Form.createFormField({ value: memberData.addressLine2 }),
      postalCode: Form.createFormField({ value: memberData.postalCode }),
      emailAddress: Form.createFormField({ value: memberData.emailAddress }),
      facebookAccount: Form.createFormField({
        value: memberData.facebookAccount,
      }),
      areaCodeHomePhone: Form.createFormField({
        value: memberData.homePhone
          ? memberData.homePhone.substr(0, 2)
          : memberData.homePhone,
      }),
      homePhone: Form.createFormField({
        value: memberData.homePhone
          ? memberData.homePhone.substr(2)
          : memberData.homePhone,
      }),
      areaCodeMobilePhone: Form.createFormField({
        value: memberData.mobilePhone
          ? memberData.mobilePhone.substr(0, 2)
          : memberData.mobilePhone,
      }),
      mobilePhone: Form.createFormField({
        value: memberData.mobilePhone
          ? memberData.mobilePhone.substr(2)
          : memberData.mobilePhone,
      }),
      hobbies: Form.createFormField({ value: memberData.hobbies }),
      // roleNames        :        [{id: "2", name: "admin"},{ id: "4",  name:"treasurer" }],
      // subComInterest        :        [{id: "2", description: "develipment"},{ id: "4", "other interest" }],
      isEcMember: Form.createFormField({
        value: memberData.isEcMember === '1',
      }),
      membershipType: Form.createFormField({
        value: memberData.membershipType,
      }),
      membershipStatus: Form.createFormField({
        value: memberData.membershipStatus,
      }),
      createdDate: Form.createFormField({
        value: moment(new Date(memberData.createdDate)).format(DATE_FORMAT),
      }),
      membershipExpiryDate: Form.createFormField({
        value: moment(new Date(memberData.membershipExpiryDate)).format(
          DATE_FORMAT,
        ),
      }),
      lastPaymentDate: Form.createFormField({
        value: memberData.lastPaymentDate
          ? moment(new Date(memberData.lastPaymentDate)).format(DATE_FORMAT)
          : memberData.lastPaymentDate,
      }),
      lastPaymentType: Form.createFormField({
        value: memberData.lastPaymentType,
      }),
    };
  }
  return {};
};

const FormMemberEditPage = Form.create({ mapPropsToFields })(MemberEdit);
// const FormMemberEditPage = Form.create()(MemberEdit);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormMemberEditPage);
