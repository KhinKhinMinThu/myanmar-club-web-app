import styled from 'styled-components';
import {
  Icon, Button, Input, Card,
} from 'antd';

export const BoldText = styled.span`
  font-weight: bold;
`;

export const BlockContainer = styled.div`
  display: block;
  text-align: left;
  margin-bottom: 20px;
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

export const ForgotPwdCard = styled(Card)`
  height: 250px;
  width: 450px;
  min-width: 450px;
  top: 20%;
  padding: 20px 5px 5px;
  border-radius: 10;
`;

export const ResetPwdCard = styled(Card)`
  height: 250px;
  width: 550px;
  min-width: 450px;
  top: 20%;
  padding: 20px 5px 5px;
  border-radius: 10;
`;
