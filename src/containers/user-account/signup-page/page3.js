import React from 'react';
import {
  Form, Card, Row, Col, Icon,
} from 'antd';
import FormStepAction from './form-step-action';

const Page3 = () => (
  <Form>
    <Card style={{ borderRadius: 15, margin: '0 auto 0 auto' }}>
      <Row gutter={8} type="flex" justify="center">
        <Col
          span={10}
          style={{
            height: '300px',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <br />
          <h2>
            Thank you for joining Myanmar Club!<Icon type="smile-o" />
          </h2>
          <br />
        </Col>
      </Row>
    </Card>
    <FormStepAction />
  </Form>
);
export default Form.create()(Page3);
