import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, List } from 'antd';
import { FormCard } from './styled-components';
import {
  NameInput,
  GenderRadio,
  DobDatePicker,
  NationalitySelect,
  ReligionSelect,
  MaritalStatusSelect,
  EducationLevelInput,
  OccupationInput,
  StayPassSelect,
  IDInput,
} from '../signup-page/components/page1-components';
import {
  AddressInput,
  PostalCodeInput,
  EmailAddressInput,
  FacebookAccInput,
  HobbiesInput,
  HomePhNoInput,
  MobileNoInput,
  Photo,
  SubComInterest,
} from '../signup-page/components/page2-components';
import {
  PwInput,
  ConfirmPwInput,
  SaveUpdateButton,
  RenewMembershipButton,
  DeleteAccButton,
} from './components';

class Profile extends React.Component {
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

  subComChkOpts = {
    valuePropName: 'checked',
  };

  static propTypes = {
    form: PropTypes.shape({}).isRequired,
  };

  state = {
    confirmDirty: false,
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

  validateToNxtPassword = (rule, value, callback) => {
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
    const { membershipInfo } = this.state;

    return (
      <div>
        <FormCard title="Member's Profile">
          <Form>
            <NameInput decorator={getFieldDecorator} />
            <GenderRadio decorator={getFieldDecorator} />
            <DobDatePicker decorator={getFieldDecorator} />
            <NationalitySelect decorator={getFieldDecorator} />
            <ReligionSelect decorator={getFieldDecorator} />
            <MaritalStatusSelect decorator={getFieldDecorator} />
            <EducationLevelInput decorator={getFieldDecorator} />
            <OccupationInput decorator={getFieldDecorator} />
            <StayPassSelect decorator={getFieldDecorator} />
            <IDInput decorator={getFieldDecorator} />
            <AddressInput decorator={getFieldDecorator} />
            <PostalCodeInput decorator={getFieldDecorator} />
            <EmailAddressInput decorator={getFieldDecorator} />
            <PwInput
              decorator={getFieldDecorator}
              validateToNxtPwd={this.validateToNxtPassword}
            />
            <ConfirmPwInput
              decorator={getFieldDecorator}
              validatetoFirstPwd={this.validatetoFirstPassword}
            />
            <FacebookAccInput decorator={getFieldDecorator} />
            <HomePhNoInput decorator={getFieldDecorator} />
            <MobileNoInput decorator={getFieldDecorator} />
            <HobbiesInput decorator={getFieldDecorator} />
            <Photo decorator={getFieldDecorator} />
            <SubComInterest decorator={getFieldDecorator} />
            <SaveUpdateButton />
          </Form>
        </FormCard>
        <br />

        {/* Membership Information */}
        <FormCard title="Membership Information">
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
                <Col
                  xs={{ span: 20 }}
                  sm={{ span: 16 }}
                  style={{ fontWeight: 'bold' }}
                >
                  {item.value}
                </Col>
              </List.Item>
            )}
          />
          <br />
          <RenewMembershipButton />
        </FormCard>

        {/* Delete Account */}
        <FormCard title="Delete Account?">
          <DeleteAccButton />
        </FormCard>
      </div>
    );
  }
}

export default Form.create({})(Profile);
