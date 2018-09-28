import React, { Component } from 'react';
import moment from 'moment';
import {
  Button, Modal, Card, Tooltip,
} from 'antd';
import {
  IncidentTypeSearchSelect,
  SubmittedBySelect,
} from './shared-components';
import { MarginLeftButton } from './shared-styled';
import SubmittedDatePicker from './submittedDatePicker';
import { DATETIME_FORMAT_DB } from '../../actions/constants';
/* eslint react/prop-types: 0 */
// IncidentSearchModal
class IncidentSearch extends Component {
  state = {
    isModalVisible: false,
  };

  onCloseModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  onOk = () => {
    const { getFieldValue, performSearchIncident } = this.props;
    const startDate = this.formatDate(getFieldValue('startDate'));
    const endDate = this.formatDate(getFieldValue('endDate'));
    const searchParams = {
      default: '0',
      incidentTypeId:
        getFieldValue('incidentType') === '0'
          ? ''
          : getFieldValue('incidentType'),
      submittedBy:
        getFieldValue('submittedBy') === '0'
          ? ''
          : getFieldValue('submittedBy'),
      startDate,
      endDate,
    };
    performSearchIncident(searchParams);

    this.setState({
      isModalVisible: false,
    });
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
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
      decorator, incidentTypes, submittedBy, getFieldValue,
    } = this.props;
    const { isModalVisible } = this.state;

    return (
      <div style={{ display: 'inline' }}>
        <Tooltip title="Advanced Search">
          <MarginLeftButton
            type="primary"
            onClick={this.showModal}
            icon="file-search"
          />
        </Tooltip>
        <Modal
          visible={isModalVisible}
          style={{ top: 50 }}
          onCancel={this.onCloseModal}
          footer={[
            <Button key="cancel" onClick={this.onCloseModal}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={this.onOk}>
              Submit
            </Button>,
          ]}
        >
          <Card style={{ borderRadius: 15, margin: '15px auto 0 auto' }}>
            <IncidentTypeSearchSelect
              decorator={decorator}
              incidentTypes={incidentTypes}
            />
            <SubmittedBySelect
              decorator={decorator}
              submittedBy={submittedBy}
            />
            <SubmittedDatePicker
              decorator={decorator}
              getFieldValue={getFieldValue}
            />
          </Card>
        </Modal>
      </div>
    );
  }
}
export default IncidentSearch;
