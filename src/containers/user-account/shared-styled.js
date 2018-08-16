import styled from 'styled-components';
import {
  Icon, Button, Input, Checkbox, Card,
} from 'antd';

// FormStep
export const StepIcon = styled(Icon)`
  font-size: 30;
`;

export const BulletIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  padding-top: 5px;
`;
// end
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

// Tabs
export const TabIcon = styled(Icon)`
  font-size: 16px;
`;
// end

// Text
export const BoldText = styled.span`
  font-weight: bold;
`;

export const HightlightedText = styled.div`
  font-weight: bold;
  text-decoration: underline;
  color: red;
`;
// end
