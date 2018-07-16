import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MemberProfile extends Component {
  a = 1;

  render() {
    const { computedMatch } = this.props;
    const { params } = computedMatch;
    const { id } = params;
    console.log('memberId', id);
    return <div>DUMMY MEMBER PROFILE: {id}</div>;
  }
}
MemberProfile.propTypes = {
  computedMatch: PropTypes.shape({}).isRequired,
};
export default MemberProfile;
