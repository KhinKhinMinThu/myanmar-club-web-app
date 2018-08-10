import styled from 'styled-components';
import {
  Icon, Table, Button, Input, Card,
} from 'antd';
import { Link } from 'react-router-dom';

// Tables
export const FullWidthTable = styled(Table)`
  width: 99%;
  margin-top: 8px;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
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

export const SearchInput = styled(Input)`
  width: 200px;
`;

export const TableInput = styled(Input)`
  width: 160px;
`;
// end

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
  color: red;
`;

export const BoldUnderlineText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;
// end

// Card
export const EventCard = styled(Card)`
  width: 900px;
  min-width: 900px;
  border-radius: 15px;
  top: 5%;
  margin-bottom: 8px;
  margin-left: auto;
  margin-right: auto;
`;
// end

// Button
export const FullButton = styled(Button)`
  width: 100%;
`;
