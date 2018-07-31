import styled from 'styled-components';
import {
  Icon, Button, Card, Input, DatePicker, Select, TimePicker,
} from 'antd';

// index
export const FormCard = styled(Card)`
  text-align: left;
  width: 900px;
  min-width: 900px;
  padding: 10px 5px 5px;
  border-radius: 15px;
  top: 5%;
  margin-bottom: 20px;
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
  justify-content: center;
  width: 100%;
`;

export const PageCard = styled(Card)`
  text-align: left;
`;

export const BulletIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
  margin-right: 10px;
  padding-top: 5px;
`;

export const MMText = styled.span`
  font-family: Myanmar3;
  text-align: justify;
`;

export const HightlightedText = styled.div`
  font-weight: bold;
  text-decoration: underline;
  color: red;
`;

// page1
export const FormInput = styled(Input)`
  width: 230px;
  margin-right: 20px;
`;

export const FormDatePicker = styled(DatePicker)`
  width: 150px;
`;

export const FormTimePicker = styled(TimePicker)`
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
