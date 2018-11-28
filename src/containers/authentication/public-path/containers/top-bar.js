import React from 'react';
import { TopBar as Top, TopBarLink } from '../styled/top-bar';
import { SIGNUP, DASHBOARD } from '../../../../actions/location';

const TopBar = () => (
  <Top>
    <TopBarLink href={SIGNUP}>SIGN UP</TopBarLink>
    <TopBarLink href={DASHBOARD}>LOG IN</TopBarLink>
  </Top>
);

export default TopBar;
