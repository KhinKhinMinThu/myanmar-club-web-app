import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin, Alert, Row, Col, Tabs, Icon,
} from 'antd';
import { getChartsData } from '../../reducers/charts/charts-data';
import MembershipChart from './chart-membership';
import MemberAgeChart from './chart-memberAge';
import EventFinanceChart from './chart-eventFinance';
import IncidentCategoriesChart from './chart-incidentCategories';
import dashboardImg from '../../images/dashaboard.jpg';

const { TabPane } = Tabs;

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
      loginData: { isEcMember, name },
    } = this.props;
    const { mounted } = this.state;
    const tabTitles = {
      tab1: (
        <span>
          <Icon type="bar-chart" theme="outlined" />
          Membership Charts
        </span>
      ),
      tab2: (
        <span>
          <Icon type="bar-chart" theme="outlined" />
          Event Finance Chart
        </span>
      ),
      tab3: (
        <span>
          <Icon type="bar-chart" theme="outlined" />
          Incident Type Chart
        </span>
      ),
    };
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
            {isEcMember !== '1' && (
              <Row
                style={{
                  backgroundImage: `url(${dashboardImg})`,
                  height: '580px',
                }}
              >
                <Col span={24}>
                  <div style={{ padding: '2px', backgroundColor: 'white' }}>
                    <h3>Hi {name},</h3>
                    <h3>Welcome to Myanmar Club!</h3>
                    <span>
                      If you have any problem, please contact Myanmar Club.
                    </span>
                  </div>
                </Col>
              </Row>
            )}
            {isEcMember === '1' && (
              <Row type="flex" justify="start">
                <Col span={24}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab={tabTitles.tab1} key="1">
                      {mounted
                        && this.isApiCalled && (
                          <div>
                            <MembershipChart
                              newMembership={
                                chartsList ? chartsList.newMembership : {}
                              }
                              renewedMembership={
                                chartsList ? chartsList.renewedMembership : {}
                              }
                              expiringMembership={
                                chartsList ? chartsList.expiringMembership : {}
                              }
                            />
                            <br />
                            <h1 style={{ textAlign: 'center' }}>
                              Membership Information in 2018
                            </h1>
                            <br />
                            {mounted && (
                              <MemberAgeChart
                                membersAges={
                                  chartsList ? chartsList.membersAges : {}
                                }
                              />
                            )}
                            <br />
                            <h1 style={{ textAlign: 'center' }}>
                              Members Age Range
                            </h1>
                          </div>
                      )}
                    </TabPane>
                    <TabPane tab={tabTitles.tab2} key="2">
                      {mounted
                        && this.isApiCalled && (
                          <div>
                            <EventFinanceChart
                              eventsFinance={
                                chartsList ? chartsList.eventsFinance : {}
                              }
                            />
                            <br />
                            <h1 style={{ textAlign: 'center' }}>
                              Event Finance Breakdown in 2018
                            </h1>
                          </div>
                      )}
                    </TabPane>
                    <TabPane tab={tabTitles.tab3} key="3">
                      {mounted && (
                        <div>
                          <IncidentCategoriesChart
                            incidentCategories={
                              chartsList ? chartsList.incidentCategories : {}
                            }
                          />
                          <h1 style={{ textAlign: 'center' }}>
                            Incident Types in 2018
                          </h1>
                        </div>
                      )}
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            )}
          </div>
        )}
      </Spin>
    );
  }
}

DashboardPage.propTypes = {
  chartsData: PropTypes.shape({}).isRequired,
  loginData: PropTypes.shape({}).isRequired,
  performGetChartsData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  chartsData: state.charts.data,
  loginData: state.login.data,
});
const mapDispatchToProps = {
  performGetChartsData: getChartsData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
