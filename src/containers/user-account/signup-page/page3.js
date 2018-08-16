import React from 'react';
import {
  Form, Card, Row, Col,
} from 'antd';
import FormStepAction from './form-step-action';

const Page3 = () => (
  <Form>
    <Card style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
      <Row gutter={8} type="flex" justify="center">
        <Col span={18} style={{ textAlign: 'left' }}>
          <br />
          ACCOUNT CREATED
          <br />
        </Col>
      </Row>
    </Card>
    <FormStepAction />
  </Form>
);
export default Form.create()(Page3);
