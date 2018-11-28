import React from 'react';
import { Row, Col, Carousel } from 'antd';
import { BoldUnderlineText } from '../shared-styled';
import carousel1 from '../../../images/carousel1.jpg';
import carousel2 from '../../../images/carousel2.jpg';
import carousel4 from '../../../images/carousel4.jpg';

const PublicMain = () => (
  <Row type="flex" justify="start">
    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
      <Row type="flex" justify="center">
        <Col span={20}>
          <h3>About Us</h3>
          <span style={{ display: 'block', marginBottom: 10 }}>
            Myanmar Club (Singapore) is a non-profit organization and registered
            under the Registry of Societies in Singapore. Our main objective is
            to promote the welfare, education and advancement of all Myanmar
            nationals and former nationals or residents who are now resident or
            are visitors to Singapore.
          </span>
          <h3>Company Overview</h3>
          <span style={{ display: 'block', marginBottom: 10 }}>
            <BoldUnderlineText>PATRONS</BoldUnderlineText>
            <br />
            (Dr) Myint Soe <br />
            (U) Daniel Tint Lwin <br />
            (U) Nyan Win Shwe Myanmar Club <br />
          </span>
          <span style={{ display: 'block', marginBottom: 10 }}>
            <BoldUnderlineText>HONORARY AUDITORS</BoldUnderlineText>
            <br /> Daw Nu Nu Yi <br />U Hla Shwe
          </span>
          <h3>Find Us!</h3>
          <span style={{ display: 'block', marginBottom: 10 }}>
            111 North Bridge Road #05-42, Peninsula Plaza Singapore, Ph: +65
            6334-3811,
          </span>
        </Col>
      </Row>
    </Col>
    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
      <div style={{ width: '900px', border: '1px solid black' }}>
        <Carousel autoplay>
          <div>
            <img
              src={carousel4}
              alt="4"
              style={{ width: '100%', height: '500px' }}
            />
          </div>
          <div>
            <img
              src={carousel2}
              alt="2"
              style={{ width: '100%', height: '500px' }}
            />
          </div>
          <div>
            <img
              src={carousel1}
              alt="1"
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        </Carousel>
      </div>
    </Col>
  </Row>
);

export default PublicMain;
