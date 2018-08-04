import styled from 'styled-components';
import { Icon, Button, Input } from 'antd';

export const BoldText = styled.span`
  font-weight: bold;
`;

export const BlockContainer = styled.div`
  display: block;
  text-align: left;
`;
export const FormInputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const CustomInput = styled(Input)`
  margin-top: 30px;
  width: 100%;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;
