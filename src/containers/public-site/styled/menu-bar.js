import { Layout } from 'antd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

export const MenuBar = styled(Header)`
  height: 5em;
  padding: 0em 15em 0em 15em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

export const MenuBarLink = styled(NavLink)`
  margin-left: 2.5em;
  font-size: 1.2em;
  color: #333333;
  text-decoration: none;
  &.${({ activeClassName }) => activeClassName} {
    text-decoration: none;
    opacity: 1;
    color: #1da57a;
  }
`;

export const MenuBarLinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
