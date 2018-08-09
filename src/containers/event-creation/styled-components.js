import styled from 'styled-components';
import {
  Button, Card, Input, DatePicker, TimePicker, Icon, Table,
} from 'antd';

// delete
export const FormCard = styled(Card)`
  text-align: left;
  width: 900px;
  min-width: 900px;
  padding: 5px 5px 5px;
  border-radius: 15px;
  top: 5%;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
`;

export const EventCard = styled(Card)`
  width: 900px;
  min-width: 900px;
  padding: 5px 5px 5px;
  border-radius: 15px;
  top: 5%;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
`;

export const FullWidthButton = styled(Button)`
  width: 99%;
`;

// page-info
export const FlexContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

export const FlexContainerLeft = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 15px;
  align-items: center;
`;

export const FormInput = styled(Input)`
  width: 200px;
  margin-right: 8px;
`;

export const FormTextArea = styled(Input.TextArea)`
  width: 200px;
  margin-right: 8px;
`;

export const FormDatePicker = styled(DatePicker)`
  width: 200px;
`;

export const FormTimePicker = styled(TimePicker)`
  width: 200px;
`;

export const ReadOnlyInput = styled(Input)`
  border: 0;
  outline: 0;
  border-radius: 0;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const TabIcon = styled(Icon)`
  font-size: 16px;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const FullWidthTable = styled(Table)`
  width: 100%;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
`;

export const SearchInput = styled(Input)`
  width: 200px;
`;
