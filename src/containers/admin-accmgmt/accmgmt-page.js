import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MemberTabs } from './components';
// import { BoldText } from './styled-components';
import { validate } from '../../reducers/accmgmt/accmgmt-ui';
import { save } from '../../reducers/accmgmt/accmgmt-data';
import EcMembersPage from './ecmembers-page';

class AccManagement extends Component {
  componentWillMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <MemberTabs
          onChange={value => console.log('tab onchange', value)}
          tabContents={[EcMembersPage]}
        />
      </div>
    );
  }
}
AccManagement.propTypes = {
  // isValidating: PropTypes.bool.isRequired,
  // dispatchValidate: PropTypes.func.isRequired,
  // dispatchSave: PropTypes.func.isRequired,
  // accmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  isValidating: state.accmgmt.ui.isValidating,
  // accmgmtData: state.accmgmt.data,
});

const mapDispatchToProps = {
  dispatchValidate: validate,
  dispatchSave: save,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccManagement);
