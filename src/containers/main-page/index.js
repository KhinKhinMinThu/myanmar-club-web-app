import React from 'react';
import { MainPageCard } from './styled-components';
import PublicMain from './public-main-page';

const MainPage = () => (
  <div className="public-pages">
    <MainPageCard bordered={false}>
      <PublicMain />
    </MainPageCard>
  </div>
);

export default MainPage;
