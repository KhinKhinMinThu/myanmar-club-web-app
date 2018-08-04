import styled from 'styled-components';
import {
  Icon, Table, Button, Input, Form, Row,
} from 'antd';

export const TabIcon = styled(Icon)`
  font-size: 16px;
`;

export const TableActionButton = styled(Button)`
  margin-right: 8px;
  border: 0;
  color: #1da57a;
  background-color: transparent;
  &:focus,
  &:visited {
    background-color: transparent;
    opacity: 1;
  }
  &:hover {
    background-color: transparent;
    opacity: 0.5;
  }
  font-size: 18px;
`;
// &:visited,
// &:link,
// &:active

export const BoldText = styled.span`
  font-weight: bold;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const FlexContainer = styled.div`
  display: flex;
  text-align: right;
`;

export const HightlightedText = styled.div`
  font-weight: bold;
  color: red;
`;

export const RowWhiteBackground = styled(Row)`
  background-color: white;
  padding: 8px;
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

export const TableInput = styled(Input)`
  width: 180px;
`;

export const ModalItem = styled(Form.Item)`
  margin-bottom: 0px;
`;

export const BoldUnderlineText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;
