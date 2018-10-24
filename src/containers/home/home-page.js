import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col,
} from 'antd';
import { getChartsData } from '../../reducers/charts/charts-data';
import MembershipChart from './chart-membership';
import MemberAgeChart from './chart-memberAge';

class DashboardPage extends Component {
  state = { mounted: false };

  componentWillMount() {
    const { performGetChartsData } = this.props;
    performGetChartsData();
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  componentWillUpdate(nextProps) {
    const {
      chartsData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.chartsData.isGetApiLoading && isGetApiLoading;
  }

  render() {
    const {
      chartsData: { chartsList, getErrMsg, isGetApiLoading },
    } = this.props;
    console.log(chartsList);
    const { mounted } = this.state;
    return (
      <Spin spinning={isGetApiLoading} size="large" delay={1000}>
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <div>
            <div className="pageHeaderContainer">
              <h2>Charts Page</h2>
            </div>
            <Row type="flex" justify="start">
              <Col span={24}>
                {mounted && (
                  <MembershipChart
                    newMembership={chartsList ? chartsList.newMembership : {}}
                    renewedMembership={
                      chartsList ? chartsList.renewedMembership : {}
                    }
                    expiringMembership={
                      chartsList ? chartsList.expiringMembership : {}
                    }
                  />
                )}
                <h1 style={{ textAlign: 'center' }}>
                  Membership Information in 2018
                </h1>
              </Col>
              <Col span={24}>
                {mounted && (
                  <MemberAgeChart
                    membersAges={chartsList ? chartsList.membersAges : {}}
                  />
                )}
                <h1 style={{ textAlign: 'center' }}>Members Age Range</h1>
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    );
  }
}

DashboardPage.propTypes = {
  chartsData: PropTypes.shape({}).isRequired,
  performGetChartsData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  chartsData: state.charts.data,
});
const mapDispatchToProps = {
  performGetChartsData: getChartsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
