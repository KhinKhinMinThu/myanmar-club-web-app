import styled from 'styled-components';
import { Icon, Table, Button } from 'antd';

// Tables
export const FullWidthTable = styled(Table)`
  width: 100%;
  margin-top: 8px;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
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
`;
// &:visited,
// &:link,
// &:active

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

export const BottomUnder = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
// end
