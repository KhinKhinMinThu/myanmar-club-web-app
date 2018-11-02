import React from 'react';
import { TopBar as Top, TopBarLink } from '../styled/top-bar';

const TopBar = () => (
  <Top>
    <TopBarLink href="/signup" target="_blank">
      SIGN UP
    </TopBarLink>
    <TopBarLink href="/login" target="_blank">
      LOG IN
    </TopBarLink>
  </Top>
);

export default TopBar;
