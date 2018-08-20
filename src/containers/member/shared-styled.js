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

export const BoldUnderlineText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

export const BottomUnder = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
// end

// Button
export const FullButton = styled(Button)`
  width: 100%;
`;
// end
