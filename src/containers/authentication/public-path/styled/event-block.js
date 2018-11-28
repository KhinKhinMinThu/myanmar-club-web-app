import styled from 'styled-components';

export const EventBlockContainer = styled.div`
  width: 70%;
  padding: 1em;
  height: 18em;
  background-color: '#fff';
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 3em;
  display: flex;
  justify-content: space-between;
`;

export const EventImage = styled.img`
  width: 30%;
  height: 16em;
  border-radius: 5px;
`;

export const EventTextContainer = styled.div`
  width: 63%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const EventTextOne = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const EventTextTwo = styled.div`
  font-size: 1.05em;
  margin-bottom: 4px;
`;

export const EventTextThree = styled.div`
  font-size: 1.05em;
  margin-top: 7px;
`;
