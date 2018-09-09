import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Modal, Button, Input, Checkbox,
} from 'antd';
import { SUCCESS_NEWROLE, SHOWFOR } from '../../actions/message';
import { postNewRole } from '../../reducers/access-control/access-control-data';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const checkboxStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};
class RoleCreation extends Component {
  componentDidUpdate(prevProps) {
    const {
      accesscontrolData: { isPostApiLoading, postErrMsg },
      isModalVisible,
    } = this.props;

    const isApiPost = prevProps.accesscontrolData.isPostApiLoading && !isPostApiLoading;
    if (!isApiPost) return;

    if (postErrMsg) {
      message.error(postErrMsg, SHOWFOR);
    } else if (isModalVisible) {
      message.success(SUCCESS_NEWROLE, SHOWFOR);
    }
  }

  onSaveButtonSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performNewRole,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const formValues = values;
        performNewRole({
          ...formValues,
        });
      }
    });
  };

  render() {
    const {
      isModalVisible,
      onCloseModal,
      decorator,
      accesscontrolData: { isPostApiLoading },
    } = this.props;
    return (
      <Modal
        title="Create a new role"
        visible={isModalVisible}
        onCancel={onCloseModal}
        style={{ top: 10 }}
        footer={[
          <Button key="close" type="default" onClick={onCloseModal}>
            Cancle
          </Button>,
          <Button key="submit" type="primary" onClick={this.onSaveButtonSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Spin spinning={isPostApiLoading} size="large" delay={1000}>
          <Form>
            <FormItem label="Role Name">
              {decorator('name')(<Input type="text" />)}
            </FormItem>
            <FormItem label="Role Description">
              {decorator('description')(<Input type="text" />)}
            </FormItem>
            <FormItem label="Accessible Function(s)">
              {decorator('functions')(
                <CheckboxGroup>
                  <Checkbox style={checkboxStyle} value="1">
                    Role Management
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="2">
                    Member Management
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="3">
                    Member Edit
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="4">
                    Claim Management
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="5">
                    Event Finance
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="6">
                    Event Management
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="7">
                    Event Creation
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="8">
                    Event Edit
                  </Checkbox>
                  <Checkbox style={checkboxStyle} value="9">
                    Event View
                  </Checkbox>
                </CheckboxGroup>,
              )}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

RoleCreation.propTypes = {
  form: PropTypes.shape({}).isRequired,
  accesscontrolData: PropTypes.shape({}).isRequired,
  onCloseModal: PropTypes.func.isRequired,
  decorator: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  performNewRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  accesscontrolData: state.accessControl.data,
  accesscontrolUI: state.accessControl.UI,
});
const mapDispatchToProps = {
  performNewRole: postNewRole,
};

const FormEventCreation = Form.create()(RoleCreation);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormEventCreation);
