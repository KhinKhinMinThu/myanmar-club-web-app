import React from 'react';
import { withRouter } from 'react-router-dom/es';
import { Row, Col } from 'antd';
import errorImg from '../../images/error.png';
import { DASHBOARD } from '../../actions/location';

const ErrorPage = () => (
  <Row type="flex" justify="center">
    <Col span={24} style={{ textAlign: 'center' }}>
      <a href={DASHBOARD}>
        <img
          alt="error"
          src={errorImg}
          style={{ width: 'auto', height: '550px' }}
        />
      </a>
      <br />
      <a style={{ fontSize: 10, color: 'grey' }} href="http://www.freepik.com">
        © Designed by Freepik
      </a>
    </Col>
  </Row>
);

export default withRouter(ErrorPage);
