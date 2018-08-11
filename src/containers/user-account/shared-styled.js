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

// Button
export const FullButton = styled(Button)`
  width: 100%;
`;
// end

// Card
export const LoginCard = styled(Card)`
  width: 450px;
`;
