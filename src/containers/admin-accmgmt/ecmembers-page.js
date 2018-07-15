import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EcMembersTable, DeSeletAllButton, SelectedMembers } from './components';
import { FlexContainer } from './styled-components';
import { setECSelectedKeys, setECLoading } from '../../reducers/accmgmt/accmgmt-ui';

class EcMembersPage extends Component {
  componentWillMount() {
    const { accmgmtData } = this.props;
    const { membersData } = accmgmtData;
    this.ecMembersList = this.prepareList(membersData.filter(item => item.isec_member === '1'));
  }

  onClick = () => {
    const { dispatchECLoading, dispatchECSelectedKeys } = this.props;
    dispatchECLoading(true);
    setTimeout(() => {
      dispatchECLoading(false);
      dispatchECSelectedKeys([]);
    }, 1000);
  };

  onSelectChange = (ecSelectedKeys) => {
    const { dispatchECSelectedKeys } = this.props;
    dispatchECSelectedKeys(ecSelectedKeys);
  };

  prepareList = (sourceList) => {
    const preparedList = [];
    sourceList.map(item => preparedList.push({
      key: `${item.id}`,
      ...item,
    }));
    return preparedList;
  };

  render() {
    const { accmgmtUI } = this.props;
    const { ecSelectedKeys, ecLoading } = accmgmtUI;
    const rowSelection = {
      selectedRowKeys: ecSelectedKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = ecSelectedKeys.length > 0;

    return (
      <div>
        <DeSeletAllButton onClick={this.onClick} hasSelected={hasSelected} loading={ecLoading} />

        {hasSelected ? <SelectedMembers selectedNum={ecSelectedKeys.length} /> : null}
        <FlexContainer>
          <EcMembersTable ecMembersList={this.ecMembersList} rowSelection={rowSelection} />
        </FlexContainer>
      </div>
    );
  }
}

EcMembersPage.propTypes = {
  // isValidating: PropTypes.bool.isRequired,
  dispatchECSelectedKeys: PropTypes.func.isRequired,
  dispatchECLoading: PropTypes.func.isRequired,
  accmgmtUI: PropTypes.shape({}).isRequired,
  accmgmtData: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  accmgmtUI: state.accmgmt.ui,
  accmgmtData: state.accmgmt.data,
});
const mapDispatchToProps = {
  dispatchECSelectedKeys: setECSelectedKeys,
  dispatchECLoading: setECLoading,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EcMembersPage);
