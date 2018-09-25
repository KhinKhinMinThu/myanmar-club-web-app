import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/es';
import moment from 'moment';
import {
  Form, Spin, Alert, Row, Col, Card, message,
} from 'antd';
import { DATETIME_FORMAT_DB } from '../../../actions/constants';
import { SHOWFOR } from '../../../actions/message';
import {
  IncidentTypeSearchSelect,
  SubmittedBySelect,
  SearchButton,
  BackButton,
} from '../shared-components';
import SubmittedDatePicker from '../submittedDatePicker';
import {
  postSearchIncident,
  getSearchParams,
} from '../../../reducers/incidentmgmt/incidentmgmt-data';

class SearchIncident extends Component {
  componentDidMount() {
    const { performGetSearchParams } = this.props;
    performGetSearchParams();
  }

  componentWillUpdate(nextProps) {
    const {
      incidentmgmtData: { isGetApiLoading },
    } = this.props;
    this.isApiCalled = !nextProps.incidentmgmtData.isGetApiLoading && isGetApiLoading;
  }

  componentDidUpdate(prevProps) {
    const {
      incidentmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.incidentmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performSearchIncident,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        const startDate = this.formatDate(formValues.startDate);
        const endDate = this.formatDate(formValues.endDate);
        const searchParams = {
          incidentTypeId:
            formValues.incidentType === '0' ? '' : formValues.incidentType,
          submittedBy:
            formValues.submittedBy === '0' ? '' : formValues.submittedBy,
          startDate,
          endDate,
        };
        performSearchIncident(searchParams);
      }
    });
  };

  // convert string date to Date object and combine date and time.
  formatDate = (strDate) => {
    if (strDate) {
      const date = new Date(strDate);
      return moment(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      ).format(DATETIME_FORMAT_DB);
    }
    return '';
  };

  render() {
    const {
      history,
      incidentmgmtData: {
        incidentTypes,
        submittedBy,
        isGetApiLoading,
        getErrMsg,
      },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const actionColLayout = {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 12 },
      style: { marginBottom: 14 },
    };

    return (
      <Spin spinning={isGetApiLoading} size="large" delay={1000}>
        <div className="pageHeaderContainer">
          <h2>Search Incidents Page</h2>
        </div>
        {this.isApiCalled && getErrMsg ? (
          <Alert
            message="Error"
            description={getErrMsg}
            type="error"
            showIcon
          />
        ) : (
          <Form onSubmit={this.onSubmit} style={{ marginTop: 50 }}>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
              <IncidentTypeSearchSelect
                decorator={getFieldDecorator}
                incidentTypes={incidentTypes}
              />
              <SubmittedBySelect
                decorator={getFieldDecorator}
                submittedBy={submittedBy}
              />
              <SubmittedDatePicker
                decorator={getFieldDecorator}
                getFieldValue={getFieldValue}
              />
              <br />
              <Row gutter={8}>
                <Col {...actionColLayout}>
                  <SearchButton />
                </Col>
                <Col {...actionColLayout}>
                  <BackButton history={history} />
                </Col>
              </Row>
            </Card>
          </Form>
        )}
      </Spin>
    );
  }
}

SearchIncident.propTypes = {
  history: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  performSearchIncident: PropTypes.func.isRequired,
  performGetSearchParams: PropTypes.func.isRequired,

  incidentmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  incidentmgmtData: state.incidentmgmt.data,
});

const mapDispatchToProps = {
  performSearchIncident: postSearchIncident,
  performGetSearchParams: getSearchParams,
};

const FormSearchIncident = Form.create()(SearchIncident);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormSearchIncident));
