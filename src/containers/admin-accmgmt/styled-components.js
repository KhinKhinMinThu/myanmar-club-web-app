import styled from 'styled-components';
import { Icon, Table, Button } from 'antd';
import { Link } from 'react-router-dom';

// export const HalfWidthButton = styled(Button)`
//   width: 49%;
// `;

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
  justify-content: center;
  padding-top: 15px;
`;

export const FullWidthTable = styled(Table)`
  width: 100%;
`;

export const MarginLeftButton = styled(Button)`
  margin-left: 8px;
`;

// export const PageCard = styled(Card)`
//   border-radius: 10;
// `;
