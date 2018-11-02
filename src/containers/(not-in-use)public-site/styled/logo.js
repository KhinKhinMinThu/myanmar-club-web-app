import styled from 'styled-components';
import Logo from '../assets/logo.jpeg';

export const LogoText = styled.div`
  color: #333333;
  left: 0;
  font-size: 1.5em;
  letter-spacing: 0.1em;
`;

export const LogoImage = styled.img.attrs({
  src: Logo,
})`
  display: block;
  max-height: 3.5em;
  width: auto;
  height: auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
