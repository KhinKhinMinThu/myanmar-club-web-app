// dummy home page: to be removed later
import React from 'react';
import { Row, Col } from 'antd';
import dummyOtter from '../../images/dummy_otter.jpg';

const DashboardPage = () => (
  <Row>
    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      <h2> ERRORERRORERRORERRORERRORERRORERRORERRORERROR</h2>
      <span>If you have any problem, please contact Team PentaHive.</span>
      <br />
      <br />
      <span>MClubPortal ©2018 Created by PentaHive.</span>
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      <img src={dummyOtter} alt="dummyOtter" style={{ height: 600 }} />
    </Col>
  </Row>
);

export default DashboardPage;
