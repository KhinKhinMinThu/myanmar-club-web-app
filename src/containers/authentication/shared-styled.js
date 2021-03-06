import styled from 'styled-components';
import { Icon, Menu } from 'antd';

export const MenuIcon = styled(Icon)`
  font-size: 16px;
`;

export const MenuItem = styled(Menu.Item)`
  &:hover {
    background: rgba(216, 230, 223, 0.5);
  }
`;

export const SubMenu = styled(Menu.SubMenu)`
  &:hover {
    background: rgba(216, 230, 223, 0.5);
  }
`;
export const HeaderText = styled.h1`
  font-style: italic;
  font-family: Impact;
  color: #ffffff;
  text-transform: uppercase;
`;

export const BoldUnderlineText = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

export const UserNameText = styled.span`
  font-style: italic;
  font-weight: bold;
  color: #02006c;
`;
