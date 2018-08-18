import styled from 'styled-components';
import { Table, Button } from 'antd';

// Tables
export const FullWidthTable = styled(Table)`
  width: 99%;
  margin-top: 8px;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
`;

export const ExtraInfoText = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-style: italic;
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
  font-size: 18px;
`;
// &:visited,
// &:link,
// &:active

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

// Button
export const FullButton = styled(Button)`
  width: 100%;
`;
