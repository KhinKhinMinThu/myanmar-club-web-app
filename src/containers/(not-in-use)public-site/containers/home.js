import React from 'react';
import { Content } from '../styled/content';
import {
  HomePhoto,
  HomePhotoText,
  HomePhotoButton,
  HomePhotoContainer,
} from '../styled/home-photo';
import HomeBlock from '../styled/home-block';
import { TitleOne } from '../styled/title';
import TextOne from '../styled/text-one';

const Home = () => (
  <Content>
    <HomePhotoContainer>
      <HomePhoto />
      <HomePhotoText> Be Part of Our Family ♡ </HomePhotoText>
      <HomePhotoButton onClick={() => window.open('/signup', '_blank')}>
        Sign Up Now
      </HomePhotoButton>
    </HomePhotoContainer>
    <HomeBlock width="100%">
      <TitleOne>About Us</TitleOne>
      <TextOne>
        Myanmar Club is non-profit organisation registered under the registry of
        Society. It was founded in 2002. Our main objective is to promote the
        welfare, education and advancement of all Myanmar nationals and former
        nationals or residents who are now resident or are visitors to
        Singapore.
      </TextOne>
    </HomeBlock>
  </Content>
);

export default Home;
