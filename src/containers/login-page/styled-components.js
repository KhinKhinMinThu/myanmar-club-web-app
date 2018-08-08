import styled from 'styled-components';
import {
  Icon, Button, Input, Checkbox, Card,
} from 'antd';

export const FormInputIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const CustomInput = styled(Input)`
  width: 100%;
`;

export const CustomCheckbox = styled(Checkbox)`
  float: left;
`;

export const CustomLinkRight = styled.a`
  float: right;
`;

export const CustomLinkLeft = styled.a`
  float: left;
`;

export const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const LoginCard = styled(Card)`
  height: 320px;
  width: 450px;
  min-width: 450px;
  top: 20%;
  padding: 20px 5px 5px;
  border-radius: 10;
`;
