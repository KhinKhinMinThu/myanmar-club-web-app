import React from 'react';
import { Row, Col } from 'antd';
import { SmallCard } from '../shared-components/common';
import { GoToLoginButton, CloseButton } from './components';
import { BoldText, BlockContainer } from './styled-components';

const SuccessfulPage = () => (
  <div className="public-pages">
    <SmallCard bordered={false}>
      <BlockContainer>
        Password reset link has been sent to
        <BoldText>
          {'"'}xxx@gmail.com{'"'}
        </BoldText>
        <br />
        Please check the email and follow the instrution to reset your password.
      </BlockContainer>
      <Row gutter={8}>
        <Col span={12}>{GoToLoginButton}</Col>
        <Col span={12}>{CloseButton}</Col>
      </Row>
    </SmallCard>
  </div>
);

export default SuccessfulPage;
