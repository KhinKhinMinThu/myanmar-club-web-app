// dummy home page: to be removed later
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import dummyOtter from '../../../images/dummy_otter.jpg';

const DashboardPage = ({ loginData }) => {
  const { name } = loginData;
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <h2>
          Hi, {name} <br />
          Welcome to Myanmar Club!
        </h2>
        <span>If you have any problem, please contact Myanmar Club.</span>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <img src={dummyOtter} alt="dummyOtter" style={{ height: 600 }} />
      </Col>
    </Row>
  );
};

DashboardPage.propTypes = {
  loginData: PropTypes.shape({}).isRequired,
};
const mapStateToProps = state => ({
  loginData: state.login.data,
});

export default connect(
  mapStateToProps,
  null,
)(DashboardPage);
