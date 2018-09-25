import styled from 'styled-components';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

// Tables
export const FullWidthTable = styled(Table)`
  width: 99%;
  margin-top: 8px;
`;

export const ExtraInfoText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-style: italic;
  margin-left: 8px;
`;

export const SelectedText = styled.span`
  margin-left: 8px;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
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
`;
// end

// Button
export const FullButton = styled(Button)`
  width: 100%;
`;

// Text
export const BottomUnder = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
