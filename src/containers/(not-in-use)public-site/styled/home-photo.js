import styled from 'styled-components';
import GroupPhoto from '../assets/group-photo.jpg';

export const HomePhoto = styled.img.attrs({
  src: GroupPhoto,
})`
  max-height: 37em;
  width: 100%;
  height: auto;
  opacity: 0.6;

  filter: blur(0.7px);
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

export const HomePhotoText = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  letter-spacing: 0.2em;
  font-weight: 500;
  color: #fff;
  user-select: none;
  padding: 0.5em 0.5em 0.5em 0.5em;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const HomePhotoButton = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1em 1.2em 1em 1.2em;
  font-size: 1.2em;
  letter-spacing: 0.2em;
  background-color: #1da57a;
  color: #fff;
  border-radius: 10px;
  user-select: none;
  &:hover {
    background-color: #158e68;
    color: #dcf4ed;
    cursor: pointer;
  }
`;

export const HomePhotoContainer = styled.div`
  position: relative;
  text-align: center;
  border-radius: 10px;
  width: 100%;
  background: linear-gradient(
    10deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 1) 100%
  );
`;
