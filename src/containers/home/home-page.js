import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Spin,
  Alert,
  Row,
  Col,
  Tabs,
  Icon,
  List,
  Card,
  Badge,
  Tag,
  Avatar,
} from 'antd';
import { getChartsData } from '../../reducers/charts/charts-data';
import { getTaskData } from '../../reducers/task-list/task-list-data';
import MembershipChart from './chart-membership';
import MemberAgeChart from './chart-memberAge';
import EventFinanceChart from './chart-eventFinance';
import IncidentCategoriesChart from './chart-incidentCategories';
import {
  EVENT_EDIT,
  CLAIM_MANAGEMENT,
  INCIDENT_EDIT,
  MEMBER_EDIT,
} from '../../actions/location';
import dashboardImg from '../../images/dashaboard.jpg';

const { TabPane } = Tabs;
class DashboardPage extends Component {
  state = { mounted: false };

  componentWillMount() {
    const {
      performGetChartsData,
      performGetTaskData,
    } = this.props;
    performGetChartsData();
    performGetTaskData();
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

  prepareDescription = (item) => {
    switch (item.taskType) {
      case 'New Membership Request':
        return [
          <Tag color="#179E71"> {item.taskType} </Tag>,
        ];
      case 'Membership Renewal Request':
        return [
          <Tag color="#4682B4"> {item.taskType} </Tag>,
        ];
      case 'Event Closure':
        return [
          <Tag color="#A52A2A"> {item.taskType} </Tag>,
        ];
      case 'Claim Approval Request':
        return [
          <Tag color="#808000"> {item.taskType} </Tag>,
        ];
      case 'Incident Follow-up':
        return [
          <Tag color="#D2691E"> {item.taskType} </Tag>,
        ];
      default:
        return [<Tag color="#A85E5E"> {item.taskType} </Tag>];
    }
  };

  prepareTitle = (item) => {
    let memberPhoto = [<Avatar src={item.photo} />];
    let eventPhoto = [<Avatar src={item.photo} />];
    if (item.photo === '' || item.photo === undefined) {
      memberPhoto = [<Avatar icon="user" style={{ color: 'black', backgroundColor: '#fde3cf' }} />, '  '];
      eventPhoto = [<Avatar icon="picture" style={{ color: 'black', backgroundColor: '#fde3cf' }} />, '  '];
    }
    switch (item.taskType) {
      case 'Event Closure':
        return [
          eventPhoto,
          <a href={EVENT_EDIT.concat('/').concat(item.id)}> {item.name} </a>,
        ];
      case 'Claim Approval Request':
        return [
          memberPhoto,
          <a href={CLAIM_MANAGEMENT}> {item.name} </a>];
      case 'Incident Follow-up':
        return [
          <Avatar
            icon="solution"
            style={{ color: 'black', backgroundColor: '#fde3cf' }}
          />,
          '  ',
          <a href={INCIDENT_EDIT.concat('/').concat(item.id)}> {item.name} </a>,
        ];
      default:
        return [
          memberPhoto,
          <a href={MEMBER_EDIT.concat('/').concat(item.id)}> {item.name} </a>,
        ];
    }
  };

  preparePendingStatus = (item) => {
    switch (item.pendingFor) {
      case '0':
        return [
          <Tag color="geekblue" style={{ marginLeft: '1px' }}>
            {' '}
            Today{' '}
          </Tag>,
        ];
      case '1':
        return [
          <Tag color="blue" style={{ marginLeft: '1px' }}>
            {' '}
            Yesterday{' '}
          </Tag>,
        ];
      default:
        return [
          <Tag color="red" style={{ marginLeft: '1px' }}>
            Pending for {item.pendingFor} days
          </Tag>,
        ];
    }
  };

  render() {
    const {
      chartsData: { chartsList, getErrMsg, isGetApiLoading },
      taskData: { taskData },
      loginData: { isEcMember, name },
    } = this.props;
    const { mounted } = this.state;
    if (taskData) this.sortedData = taskData.sort((a, b) => (b.pendingFor - a.pendingFor));
    if (taskData) this.numTask = taskData.length;
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
            <div className="pageHeaderContainer">
              <h2>Home Page</h2>
            </div>
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
              <Row gutter={7} type="flex" justify="start">
                <Col span={17}>
                  <Card style={{ marginTop: '50px' }}>
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
                  </Card>
                </Col>
                <Col span={7}>
                  <Card
                    title="Task List"
                    style={{ marginTop: '50px' }}
                    extra={(
                      <Badge count={this.numTask}>
                        <Avatar size="small" icon="alert" style={{ color: 'black', backgroundColor: 'white' }} />
                      </Badge>
                  )}
                  >
                    <List
                      locale={{ emptyText: 'You have no task items' }}
                      itemLayout="horizontal"
                      dataSource={this.sortedData}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={this.prepareTitle(item)}
                            description={[
                              this.prepareDescription(item),
                              this.preparePendingStatus(item),
                            ]}
                          />
                        </List.Item>
                      )}
                    />,
                  </Card>
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
  taskData: PropTypes.shape({}).isRequired,
  loginData: PropTypes.shape({}).isRequired,
  performGetChartsData: PropTypes.func.isRequired,
  performGetTaskData: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  chartsData: state.charts.data,
  taskData: state.taskList.data,
  loginData: state.login.data,
});
const mapDispatchToProps = {
  performGetChartsData: getChartsData,
  performGetTaskData: getTaskData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
