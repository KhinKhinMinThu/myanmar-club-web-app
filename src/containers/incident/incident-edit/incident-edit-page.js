import React, { Component } from 'react';
import { withRouter } from 'react-router-dom/es';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Row, Col, Spin, Modal, Card, Alert,
} from 'antd';
import {
  SUCCESS_UPDATEINCIDENT,
  CONFIRM_DELETEINCIDENT,
  SHOWFOR,
} from '../../../actions/message';
import IncidentTypeInput from '../incidentTypeInput';
import IncidentDescriptionInput from '../incidentDescriptionInput';
import {
  IdReadOnly,
  IncidentNameInput,
  RequesterAgeSelect,
  RequesterNameInput,
  DeleteIncidentSwitch,
  BackButton,
  SaveUpdateButton,
} from '../shared-components';

import {
  postUpdateIncident,
  postDeleteIncidents,
  setIncident,
  getIncident,
  // getSearchParams,
} from '../../../reducers/incidentmgmt/incidentmgmt-data';

const { confirm } = Modal;

class IncidentEdit extends Component {
  componentWillMount() {
    const {
      computedMatch: {
        params: { id },
      },
      performGetIncident,
    } = this.props;
    if (id) performGetIncident({ id });
  }

  // componentDidMount() {
  //   const { performGetSearchParams } = this.props;
  //   performGetSearchParams();
  // }

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
    } else {
      message.success(SUCCESS_UPDATEINCIDENT, SHOWFOR);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll, getFieldValue },
      incidentmgmtData: { incidentTypes },
      computedMatch: {
        params: { id },
      },
      dispatchSetIncident,
      performUpdateIncident,
      performDeleteIncidents,
    } = this.props;

    // if user selects to delete incidentData, it will be deleted without
    // updating the rest of the data even if the user changed anything else.
    if (getFieldValue('deleteIncident')) {
      confirm({
        title: CONFIRM_DELETEINCIDENT,
        onOk() {
          performDeleteIncidents({ incidentsToDelete: [id] });
        },
      });
    } else {
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

          const incidentToUpdate = {
            ...formValues,
            id,
            incidentTypeId,
            incidentType,
          };
          dispatchSetIncident(incidentToUpdate);
          performUpdateIncident(incidentToUpdate);
        }
      });
    }
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
          <h2>Edit Incident Page</h2>
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
              <IdReadOnly decorator={getFieldDecorator} />
              <IncidentNameInput decorator={getFieldDecorator} />
              <IncidentTypeInput
                form={form}
                decorator={getFieldDecorator}
                incidentTypes={incidentTypes}
              />
              <RequesterNameInput decorator={getFieldDecorator} />
              <RequesterAgeSelect decorator={getFieldDecorator} />
              <IncidentDescriptionInput decorator={getFieldDecorator} />
            </Card>
            <Card style={{ borderRadius: 15, margin: '0 auto 8px auto' }}>
              <DeleteIncidentSwitch decorator={getFieldDecorator} />
              <br />
              <Row gutter={8}>
                <Col {...actionColLayout}>
                  <SaveUpdateButton loading={isPostApiLoading} />
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

IncidentEdit.propTypes = {
  history: PropTypes.shape({}).isRequired,
  computedMatch: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,

  // performGetSearchParams: PropTypes.func.isRequired,
  performGetIncident: PropTypes.func.isRequired,
  performUpdateIncident: PropTypes.func.isRequired,
  dispatchSetIncident: PropTypes.func.isRequired,
  performDeleteIncidents: PropTypes.func.isRequired,

  incidentmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  incidentmgmtData: state.incidentmgmt.data,
});

const mapDispatchToProps = {
  // performGetSearchParams: getSearchParams,
  performGetIncident: getIncident,
  performUpdateIncident: postUpdateIncident,
  dispatchSetIncident: setIncident,
  performDeleteIncidents: postDeleteIncidents,
};

const mapPropsToFields = ({
  incidentmgmtData: { incident, incidentTypes },
}) => {
  const incidentData = incident || {};
  let incidentTypeId;
  let isOtherType;
  if (incident) {
    isOtherType = incidentData.incidentTypeId === '-1';
    incidentTypeId = incidentData.incidentTypeId === '-1'
      ? incidentData.incidentTypeId
      : incidentTypes
        .findIndex(item => item.id === incidentData.incidentTypeId)
        .toString();
  }

  return {
    id: Form.createFormField({ value: incidentData.id }),
    name: Form.createFormField({ value: incidentData.name }),
    description: Form.createFormField({ value: incidentData.description }),
    requesterName: Form.createFormField({ value: incidentData.requesterName }),
    requesterAge: Form.createFormField({ value: incidentData.requesterAge }),
    incidentType: Form.createFormField({ value: incidentTypeId }),
    otherIncidentType: Form.createFormField({
      value: isOtherType ? incidentData.incidentType : '',
    }),
  };
};
const FormIncidentEditPage = Form.create({ mapPropsToFields })(IncidentEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(FormIncidentEditPage));
