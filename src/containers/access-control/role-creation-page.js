import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form, message, Spin, Modal, Button, Input, Checkbox, Col,
} from 'antd';
import { SUCCESS_NEWROLE, SHOWFOR } from '../../actions/message';
import { postNewRole } from '../../reducers/access-control/access-control-data';

const FormItem = Form.Item;
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
      // window.location.reload();
    }
  }

  onSaveButtonSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      performNewRole,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const functions = [];
      Object.entries(values).forEach((item) => {
        if (item[0].includes('funcChk') && item[1]) {
          const id = item[0].substring(7);
          functions.push(id);
        }
      });
      console.log('functions', functions);
      console.log('form values', values);
      if (!error) {
        const formValues = values;
        performNewRole({
          ...formValues,
          functions,
        });
      }
    });
  };

  render() {
    const {
      isModalVisible,
      onCloseModal,
      decorator,
      funcList,
      accesscontrolData: { isPostApiLoading },
    } = this.props;
    console.log('fucn', funcList);
    const checkBoxList = funcList.map(item => (
      <FormItem key={item.id} style={{ marginBottom: 0 }}>
        {decorator(`funcChk${item.key}`)(
          <Checkbox style={{ float: 'left', lineHeight: '30px' }}>
            {item.description}
          </Checkbox>,
        )}
      </FormItem>
    ));
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
              {decorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input role name!',
                  },
                ],
              })(<Input type="text" />)}
            </FormItem>
            <FormItem label="Role Description">
              {decorator('description', {
                initialValue: '',
              })(<Input type="text" />)}
            </FormItem>
            <FormItem
              label="Accessible Function(s)"
              style={{ marginBottom: 0 }}
            >
              <Col>{checkBoxList}</Col>
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
  funcList: PropTypes.shape({}).isRequired,
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
