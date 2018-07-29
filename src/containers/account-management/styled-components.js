import styled from 'styled-components';
import {
  Icon, Table, Button, Input, Form,
} from 'antd';
import { Link } from 'react-router-dom';

export const TabIcon = styled(Icon)`
  font-size: 16px;
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

export const BoldText = styled.span`
  font-weight: bold;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 15px;
  align-items: center;
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

export const TableActionButton = styled(Button)`
  margin-right: 8px;
  border: 0;
  color: #1da57a;
  background-color: transparent;
  font-size: 18px;
  &:focus,
  &:visited {
    background-color: transparent;
    opacity: 1;
  }
  &:hover {
    background-color: transparent;
    opacity: 0.5;
  }
`;
// &:visited,
// &:link,
// &:active

export const ModalItem = styled(Form.Item)`
  margin-bottom: 0px;
`;
