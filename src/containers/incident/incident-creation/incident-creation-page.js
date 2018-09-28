import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  message,
  Row,
  Col,
  Spin,
  Card,
  Alert,
} from 'antd';
import { SUCCESS_NEWINCIDENT, SHOWFOR } from '../../../actions/message';
import IncidentTypeInput from '../incidentTypeInput';
import IncidentDescriptionInput from '../incidentDescriptionInput';
import {
  IncidentNameInput,
  RequesterAgeSelect,
  RequesterNameInput,
  BackButton,
  CreateIncidentButton,
} from '../shared-components';
import {
  postNewIncident,
  getSearchParams,
} from '../../../reducers/incidentmgmt/incidentmgmt-data';

class IncidentCreation extends Component {
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
      history,
      incidentmgmtData: { isPostApiLoading, postErrMsg },
    } = this.props;

    const isApiPost = prevProps.incidentmgmtData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else {
      message.success(SUCCESS_NEWINCIDENT, SHOWFOR);
      history.go(-1);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      incidentmgmtData: { incidentTypes },
      performNewIncident,
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        let incidentTypeId;
        let incidentType;
        if (formValues.incidentType === '-1') {
          incidentTypeId = '-1';
          incidentType = formValues.otherIncidentType || '';
        } else {
          const incident = incidentTypes[Number(formValues.incidentType)];
          incidentTypeId = incident.id;
          incidentType = incident.name;
        }
        delete formValues.otherIncidentType;

        performNewIncident({
          ...formValues,
          incidentTypeId,
          incidentType,
        });
      }
    });
  };

  render() {
    const {
      history,
      form,
      form: { getFieldDecorator },
      incidentmgmtData: {
        incidentTypes,
        isGetApiLoading,
        getErrMsg,
        isPostApiLoading,
      },
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
          <h2>Add New Incident Page</h2>
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
              <IncidentNameInput decorator={getFieldDecorator} />
              <IncidentTypeInput
                form={form}
                decorator={getFieldDecorator}
                incidentTypes={incidentTypes}
              />
              <RequesterNameInput decorator={getFieldDecorator} />
              <RequesterAgeSelect decorator={getFieldDecorator} />
              <IncidentDescriptionInput decorator={getFieldDecorator} />
              <br />
              <Row gutter={8}>
                <Col {...actionColLayout}>
                  <CreateIncidentButton loading={isPostApiLoading} />
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

IncidentCreation.propTypes = {
  history: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  performNewIncident: PropTypes.func.isRequired,
  performGetSearchParams: PropTypes.func.isRequired,

  incidentmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  incidentmgmtData: state.incidentmgmt.data,
});
const mapDispatchToProps = {
  performNewIncident: postNewIncident,
  performGetSearchParams: getSearchParams,
};

const FormIncidentCreation = Form.create()(IncidentCreation);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormIncidentCreation));
