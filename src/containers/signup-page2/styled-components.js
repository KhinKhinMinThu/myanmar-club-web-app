import styled from 'styled-components';
import {
  Icon, Button, Card, Input, DatePicker, Select,
} from 'antd';

// index
export const FormCard = styled(Card)`
  width: 100%;
  padding: 15px;
  border-radius: 10;
  top: 5%;
  margin-left: auto;
  margin-right: auto;
`;

// form-step
export const StepIcon = styled(Icon)`
  font-size: 30;
`;

// form-step-action
export const HalfWidthButton = styled(Button)`
  width: 49%;
`;

// page-info
export const FlexContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const PageCard = styled(Card)`
  text-align: left;
  width: 100%;
`;

export const MMText = styled.span`
  font-family: Myanmar3;
  text-align: justify;
`;

export const BulletIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  padding-top: 5px;
`;

export const HightlightedText = styled.div`
  font-weight: bold;
  text-decoration: underline;
  color: red;
`;

// page1
export const FormInput1 = styled(Input)`
  width: 200;
`;

export const FormDatePicker = styled(DatePicker)`
  width: 200;
`;

export const FormSelect = styled(Select)`
  width: 200;
`;

export const ExtraInfoText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-style: italic;
  margin-left: 8;
`;
