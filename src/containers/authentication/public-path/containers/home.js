import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
// import { Content } from '../styled/content';
import {
  HomePhoto,
  HomePhotoText,
  HomePhotoButton,
  HomePhotoContainer,
} from '../styled/home-photo';
import { Aboutusblock } from '../styled/home-block';
import { TitleOne } from '../styled/title';
import TextOne from '../styled/text-one';
import { SIGNUP } from '../../../../actions/location';

const Home = () => (
  <Row type="flex" justify="start">
    <Col xs={20} sm={20} md={20} lg={18} xl={18}>
      <HomePhotoContainer>
        <HomePhoto />
        <HomePhotoText> Be Part of Our Family ♡ </HomePhotoText>
        <Link to={SIGNUP}>
          <HomePhotoButton>Sign Up Now</HomePhotoButton>
        </Link>
      </HomePhotoContainer>
    </Col>
    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
      <Aboutusblock width="100%">
        <TitleOne>About Us</TitleOne>
        <TextOne>
          Myanmar Club is non-profit organisation registered under the registry
          of Society. It was founded in 2002. Our main objective is to promote
          the welfare, education and advancement of all Myanmar nationals and
          former nationals or residents who are now resident or are visitors to
          Singapore.
        </TextOne>
      </Aboutusblock>
    </Col>
  </Row>
);

export default Home;
