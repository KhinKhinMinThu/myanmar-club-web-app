// dummy home page: to be removed later
import React from 'react';
import { Col } from 'antd';
import { PageCard } from '../shared-components/common';
import dummyOtter from '../../images/dummy_otter.jpg';

const DashboardPage = () => (
  <div className="public-pages">
    <PageCard bordered={false}>
      <Col span={8}>
        <img src={dummyOtter} alt="dummyOtter" style={{ height: 600 }} />
      </Col>
      <Col span={16}>
        <h2> Welcome to Myanmar Club Web Portal!</h2>
        <span>If you have any problem, please contact Team PentaHive.</span>
        <br />
        <br />
        <span>MClubPortal ©2018 Created by PentaHive.</span>
      </Col>
    </PageCard>
  </div>
);

export default DashboardPage;
