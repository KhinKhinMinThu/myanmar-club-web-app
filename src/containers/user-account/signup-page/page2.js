import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, Row, Col, Card, Modal, BackTop, Tooltip,
} from 'antd';
import FormStepAction from './form-step-action';
import { MEMBERSHIP_FEES, MEMBERSHIP_TYPES } from '../../../actions/constants';
import {
  CONFIRM_CREATEACC,
  SUCCESS_PAYMENT,
  ERROR_PAYMENT,
  CANCEL_PAYMENT,
} from '../../../actions/message';
import { MembershipTypeRadio } from '../../shared-profile-components/shared-components';
import { Payment, PaymentModal } from '../../shared-profile-components/payment';
import { MMText } from '../../shared-profile-components/shared-styled';
import { HightlightedText } from '../shared-styled';
import {
  TotalAmountInput,
  feesTbl,
  DeclarationCheckBox,
} from '../shared-components';
import { next } from '../../../reducers/membermgmt/membermgmt-ui';
import {
  setMemberData,
  postSignup,
} from '../../../reducers/membermgmt/membermgmt-data';

const { confirm } = Modal;

class Page2 extends Component {
  state = {
    isModalVisible: false,
    showDirectPayment: false,
    paymentOption: 'Bank',
  };

  onChange = (e) => {
    const { value } = e.target;
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      totalAmount: MEMBERSHIP_FEES[value],
      totalAmt: MEMBERSHIP_FEES[value],
    });
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onSelect = (e) => {
    const { showDirectPayment, paymentOption } = this.state;
    if (e.target.value === 'Direct Online Payment' && !showDirectPayment) {
      this.setState({ showDirectPayment: true });
      // unhide and reset the fields with validator
    }
    if (e.target.value !== 'Direct Online Payment') {
      this.setState({ showDirectPayment: false });
      if (e.target.value === 'Bank Transfer') {
        this.setState({ paymentOption: 'Bank' });
      } else {
        this.setState({ paymentOption: 'Cash' });
      }
      console.log('payment Type', paymentOption);
      // hide the fields with validator
    }
  };

  onSuccess = (payment) => {
    const {
      form: { getFieldsValue },
      membermgmtData: { memberData },
      dispatchMemberData,
      dispatchNext,
      performSignup,
    } = this.props;
    console.log('Successful payment!', payment);
    Modal.success({ title: 'Success!', content: SUCCESS_PAYMENT });
    const formValues = getFieldsValue();
    const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
    const memberToAdd = {
      ...memberData,
      ...formValues,
      membershipType,
      totalAmount: formValues.totalAmount.toString(),
    };
    dispatchMemberData(memberToAdd);
    // perform backend post
    performSignup(memberToAdd);
    dispatchNext();
    document.documentElement.scrollTop = 0;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      membermgmtData: { memberData },
      dispatchMemberData,
      dispatchNext,
      performSignup,
    } = this.props;
    const paymentType = getFieldValue('paymentType');
    validateFieldsAndScroll((error, values) => {
      if (!error && paymentType === 'Direct Online Payment') {
        confirm({
          title: CONFIRM_CREATEACC,
          onOk: () => {
            this.setState({ isModalVisible: true });
          },
        });
      }
      if (!error && paymentType !== 'Direct Online Payment') {
        const formValues = values;
        const membershipType = MEMBERSHIP_TYPES[formValues.membershipType];
        const memberToAdd = {
          ...memberData,
          ...formValues,
          membershipType,
          totalAmount: formValues.totalAmount.toString(),
        };
        dispatchMemberData(memberToAdd);
        confirm({
          title: CONFIRM_CREATEACC,
          onOk() {
            // perform backend post
            performSignup(memberToAdd);
            dispatchNext();
            document.documentElement.scrollTop = 0;
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const {
      showDirectPayment, paymentOption, isModalVisible,
    } = this.state;
    let membership = MEMBERSHIP_TYPES[getFieldValue('membershipType')];
    if (membership === undefined) {
      membership = MEMBERSHIP_TYPES.TYP1;
    }
    const onError = (error) => {
      console.log('Erroneous payment OR failed to load script!', error);
      Modal.error({ title: 'Error!', content: ERROR_PAYMENT });
    };
    const onCancel = (data) => {
      console.log('Cancelled payment!', data);
      Modal.warning({ title: 'Success!', content: CANCEL_PAYMENT });
    };
    return (
      <Form onSubmit={this.onSubmit}>
        <Tooltip title="Click to go back to the top">
          <BackTop />
        </Tooltip>
        <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
          <Row gutter={8} type="flex" justify="center">
            <Col span={12}>{feesTbl}</Col>
          </Row>
        </Card>
        <Row gutter={8} justify="start">
          <Col span={24}>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
              <MembershipTypeRadio
                decorator={getFieldDecorator}
                onChange={this.onChange}
              />
              <Payment
                decorator={getFieldDecorator}
                showDirectPayment={showDirectPayment}
                paymentOption={paymentOption}
                onSelect={this.onSelect}
              />
              <PaymentModal
                isModalVisible={isModalVisible}
                onCloseModal={this.onCloseModal}
                decorator={getFieldDecorator}
                onSuccess={this.onSuccess}
                onError={onError}
                onCancel={onCancel}
                total={getFieldValue('totalAmount')}
                membership={membership}
              />
              <TotalAmountInput decorator={getFieldDecorator} />
            </Card>
          </Col>
        </Row>
        <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
          <Row gutter={8} type="flex" justify="center">
            <Col span={16}>
              <HightlightedText>
                Declaration by applicant{' '}
                <MMText>(လျှောက်ထားသူမှ ခံဝန်ချက်)</MMText>
              </HightlightedText>
              <br />
              I declare that the above particulars given by me are true and
              correct and I agree to abide by the Constitution of the society.
              <br />
              <MMText>
                အထက်ဖော်ပြပါ မိမိ၏ ကိုယ်ရေးအချက်အလက်များသည် မှန်ကန်ပါသည်။
              </MMText>
              <br />
              <MMText>
                မိမိသည် မြန်မာကလပ်(စင်္ကာပူ) အသင်း၏ ဖွဲ့စည်းပုံစည်းမျဉ်းများကို
                လိုက်နာပါမည်။
              </MMText>
              <DeclarationCheckBox decorator={getFieldDecorator} />
            </Col>
          </Row>
          <Row gutter={8} type="flex" justify="center">
            <Col span={16}>
              <br />
              If you have any difficulties with online membership application,
              you are invited to come to Myanmar Club Office at Peninsula Plaza
              #05-42 from 13:00 to 19:00 hour on every Saturday.
              <br />
              <MMText>
                အကယ်၍ အွန်လိုင်းအသင်းဝင်ခွင့် လျှောက်ထားခြင်းနှင့် ပါတ်သက်၍
                အခက်အခဲရှိပါက မြန်မာကလပ် ရုံးခန်း (ပင်နီဆူလာပလာဇာ၊ ၅ထပ်
                အခန်းအမှတ် ၄၁) သို့ စနေနေ့များတွင် နေ့လည် ၁နာရီမှ ညနေ ရနာရီအထိ
                ကိုယ်တိုင်လာရောက် ဆောင်ရွက်နိုင်ပါသည်။
              </MMText>
            </Col>
          </Row>
        </Card>
        <FormStepAction />
      </Form>
    );
  }
}

Page2.propTypes = {
  form: PropTypes.shape({}).isRequired,
  dispatchMemberData: PropTypes.func.isRequired,
  dispatchNext: PropTypes.func.isRequired,
  performSignup: PropTypes.func.isRequired,

  membermgmtData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  membermgmtData: state.membermgmt.data,
});

const mapDispatchToProps = {
  dispatchMemberData: setMemberData,
  dispatchNext: next,
  performSignup: postSignup,
};

const FormPage2 = Form.create()(Page2);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPage2);
