import styled from 'styled-components';
import {
  Button, Card, Input, DatePicker, TimePicker, Form,
} from 'antd';

// index
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

export const FullWidthButton = styled(Button)`
  width: 100%;
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

export const FormItemNoMargin = styled(Form.Item)`
  margin-bottom: 0px;
`;

export const ReadOnlyInput = styled(Input)`
  border: 0;
`;
