// dummy home page: to be removed later
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import dashboardImg from '../../../images/dashaboard.jpg';

const DashboardPage = ({ loginData }) => {
  const { name } = loginData;
  return (
    <Row style={{ backgroundImage: `url(${dashboardImg})`, height: '600px' }}>
      <Col span={24}>
        <div style={{ padding: '2px', backgroundColor: 'white' }}>
          <h2>Hi {name}, Welcome to Myanmar Club!</h2>
          <span>If you have any problem, please contact Myanmar Club.</span>
        </div>
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
