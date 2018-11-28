import { Layout } from 'antd';
import styled from 'styled-components';

const { Header } = Layout;

export const TopBar = styled(Header)`
  height: 3em;
  padding: 0em 15em 0em 15em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #312d2d;
`;

export const TopBarLink = styled.a.attrs({
  href: ({ href }) => href || '',
})`
  color: #fff;
  margin-left: 2em;
  font-size: 0.9em;
  text-decoration: none;
  &:visited {
    text-decoration: none;
    opacity: 1;
    color: #fff;
  }
  &:link {
    text-decoration: none;
    opacity: 1;
    color: #fff;
  }
  &:active {
    text-decoration: none;
    opacity: 1;
    color: #fff;
  }
`;
