import styled from 'styled-components';
import { Icon, Menu } from 'antd';

export const MenuIcon = styled(Icon)`
  font-size: 16px;
`;

export const MainMenu = styled(Menu)`
  height: 100vh;
  width: 100%;
`;

export const MenuItem = styled(Menu.Item)`
  &:hover {
    background: rgba(216, 230, 223, 0.5);
  }
`;

export const MenuContainer = styled.div`
  width: 200px;
`;
export const FlexContainer = styled.div`
  display: flex;
`;
