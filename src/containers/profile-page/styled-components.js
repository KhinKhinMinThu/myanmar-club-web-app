import styled from 'styled-components';
import {
  Icon, Button, Input, DatePicker, Select, Radio, Card,
} from 'antd';

const { MonthPicker } = DatePicker;

export const PageCard = styled(Card)`
  textalign: left;
  width: 100%;
`;

export const FormCard = styled(Card)`
  width: 1100px;
  min-width: 1100px;
  border-radius: 10px;
  top: 5%;
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: auto;
  textalign: left;
`;

export const TabIcon = styled(Icon)`
  font-size: 16px;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const HalfWidthButton = styled(Button)`
  width: 49%;
`;

export const FullButton = styled(Button)`
  width: 100%;
`;

// page1
export const FormInput = styled(Input)`
  width: 200px;
`;

export const FormDatePicker = styled(DatePicker)`
  width: 200px;
`;

export const FormMonthPicker = styled(MonthPicker)`
  width: 200px;
`;

export const FormSelect = styled(Select)`
  width: 250px;
`;

export const ExtraInfoText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-style: italic;
  margin-left: 8px;
`;

export const ButtonContainer = styled.div`
  margin-top: 15px;
  text-align: center;
  display: inline-block;
  width: 100%;
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

export const FormRadio = styled(Radio)`
  padding-top: 6px;
  display: 'inline-block';
  line-height: 2;
  float: 'left';
`;

export const MMText = styled.span`
  font-family: Myanmar3;
  text-align: justify;
`;
