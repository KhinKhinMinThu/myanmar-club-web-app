import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProfileTabs } from './components';
import MemberProfilePage from './member-profile-page';
import MemberRenewPage from './member-renew-page';

class MemberManagement extends Component {
  componentDidMount() {
    const {
      computedMatch: { params },
    } = this.props;
    const { id } = params;
    console.log('memberId', id);
  }

  render() {
    return (
      <div>
        <ProfileTabs
          onChange={() => console.log('tabs on chage')}
          tabContents={[MemberProfilePage, MemberRenewPage]}
        />
      </div>
    );
  }
}
MemberManagement.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
};

export default MemberManagement;
