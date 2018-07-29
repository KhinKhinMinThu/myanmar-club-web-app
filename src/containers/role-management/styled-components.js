import styled from 'styled-components';
import { Button, Select } from 'antd';

export const HalfWidthButton = styled(Button)`
  width: 49%;
`;

export const RoleSelect = styled(Select)`
  width: 200;
`;

export const BoldUnderlineText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

export const ButtonContainer = styled.div`
  margin-top: 15px;
  text-align: center;
  display: inline-block;
  width: 100%;
`;
