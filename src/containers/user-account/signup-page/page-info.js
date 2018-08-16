import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, Form,
} from 'antd';
import PropTypes from 'prop-types';
import { MEMBERSHIP_INFO } from '../../../actions/constants';
import { MMText } from '../../shared-profile-components/shared-styled';
import { BulletIcon, HightlightedText } from '../shared-styled';
import { feesTbl } from '../shared-components';
import FormStepAction from './form-step-action';
import { next } from '../../../reducers/membermgmt/membermgmt-ui';

const MMBulletText = ({ text }) => (
  <div>
    <BulletIcon type="star" />
    <MMText> {text} </MMText>
  </div>
);
MMBulletText.propTypes = {
  text: PropTypes.string.isRequired,
};

const PageInfo = ({ dispatchNext }) => (
  <Form onSubmit={() => dispatchNext()}>
    <Card style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
      <Row gutter={8} type="flex" justify="center">
        <Col span={24} style={{ textAlign: 'center' }}>
          <HightlightedText>
            MEMBERSHIP FEES
            <MMText>(အသင်းသားအဖြစ် ပေးသွင်းရန်)</MMText>
          </HightlightedText>
        </Col>
        <Col span={18} style={{ textAlign: 'left' }}>
          <br />
          {/* only use index as key if array is fixed and list won't be rerendered */}
          {MEMBERSHIP_INFO.map((text, i) => (
            <MMBulletText key={i.toString()} text={text} />
          ))}
          <br />
        </Col>
      </Row>
      <Row gutter={8} type="flex" justify="center">
        <Col span={12}>{feesTbl}</Col>
      </Row>
    </Card>
    <FormStepAction />
  </Form>
);

PageInfo.propTypes = {
  dispatchNext: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  dispatchNext: next,
};
const FormPageInfo = Form.create()(PageInfo);
export default connect(
  null,
  mapDispatchToProps,
)(FormPageInfo);
