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
  color: #800000;
  font-style: italic;
  font-weight: bold;
`;

export const HighlightText = styled.span`
  color: #4169e1;
  font-weight: bold;
  font-style: italic;
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
