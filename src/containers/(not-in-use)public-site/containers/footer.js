import React from 'react';
import HomeBlock from '../styled/home-block';
import { TitleOne, TitleTwo } from '../styled/title';
import TextOne from '../styled/text-one';
import {
  TextTwoLeft,
  TextTwoRight,
  TextTowContainer,
} from '../styled/text-two';
import Foot from '../styled/footer';
import {
  OrgContainer,
  OrgChildContainer,
  OrgParentContainer,
} from '../styled/organisation';
import Copyright from '../styled/copyright';

const Footer = () => (
  <div>
    <Foot>
      <HomeBlock width="27%">
        <TitleOne>Contact</TitleOne>
        <TextTowContainer>
          <TextTwoLeft>Phone: </TextTwoLeft>
          <TextTwoRight>+65 6334 3811 </TextTwoRight>
        </TextTowContainer>

        <TextTowContainer>
          <TextTwoLeft> Address: </TextTwoLeft>
          <TextTwoRight>
            111 North Bridge Road #05-42 Peninsula Plaza Singapore
          </TextTwoRight>
        </TextTowContainer>
      </HomeBlock>
      <OrgContainer>
        <TitleOne> Organisation </TitleOne>
        <OrgParentContainer>
          <OrgChildContainer>
            <TitleTwo> Patrons </TitleTwo>
            <TextOne> (Dr) Myint Soe </TextOne>
            <TextOne> (U) Daniel Tint Lwin </TextOne>
            <TextOne> (U) Nyan Win Shwe </TextOne>
          </OrgChildContainer>
          <OrgChildContainer>
            <TitleTwo> Office Bearers </TitleTwo>
            <TextOne> (Dr) Myat Maw Tun - President </TextOne>
            <TextOne> (U) Ngwe Soe - Vice President </TextOne>
            <TextOne> (Daw) Thet Hnin Yi - Secretary </TextOne>
            <TextOne> (U) Phyo Min Khine - Assistant Secretary </TextOne>
            <TextOne> (Daw) Mya Mya Sein - Treasurer </TextOne>
            <TextOne> (U) Myint Naing - Assistant Treasurer </TextOne>
          </OrgChildContainer>
          <OrgChildContainer>
            <TitleTwo> Committee Members </TitleTwo>
            <TextOne> U Tin Lin </TextOne>
            <TextOne> U Win Aung </TextOne>
            <TextOne> U Ro Thawn </TextOne>
            <TextOne> U Myo Thaw Tun </TextOne>
            <TextOne> Daw May Kyaw Soe Nyunt </TextOne>
            <TextOne> Daw Su Myat Naing Aung </TextOne>
          </OrgChildContainer>
        </OrgParentContainer>
      </OrgContainer>
    </Foot>
    <Copyright>Copyright © 2018 Myanmar Club</Copyright>
  </div>
);

export default Footer;
