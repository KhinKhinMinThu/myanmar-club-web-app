import styled from 'styled-components';
import {
  Icon, Button, Card, Input, DatePicker, Select, TimePicker, Table,
} from 'antd';
import { Link } from 'react-router-dom';

// index
export const FormCard = styled(Card)`
  text-align: left;
  width: 900px;
  min-width: 900px;
  padding: 5px 5px 5px;
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
  width: 25%;
  margin-right: 40px;
`;

export const FullWidthTable = styled(Table)`
  width: 100%;
`;

export const TableActionIcon = styled(Icon)`
  margin-right: 16px;
  font-size: 18px;
`;

export const TableActionLink = styled(Link)`
  color: #1da57a;
  &:hover {
    color: #1da57a;
    opacity: 0.5;
  }
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
