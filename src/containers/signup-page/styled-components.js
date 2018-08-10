import styled from 'styled-components';
import {
  Icon, Button, Input, DatePicker, Select, Radio, Card,
} from 'antd';

export const FormCard = styled(Card)`
  textalign: 'left';
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

// page1
export const FormInput = styled(Input)`
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
  display: block;
  line-height: 2;
`;

export const MMText = styled.span`
  font-family: Myanmar3;
  text-align: justify;
`;
