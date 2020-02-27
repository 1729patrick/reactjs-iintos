import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-row-gap: 19px;
  grid-column-gap: 19px;
  padding: 20px;

  @media (max-width: 1024px) and (min-height: 550px) {
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    padding: 23px;
  }
`;

export const Title = styled.div`
  color: #000;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export const Card1 = styled.div`
  background-color: #fff;
  border-radius: 5px;
  grid-column: 1 / 7;
  grid-row: 1 / 7;
  overflow: hidden;

  @media (max-width: 1024px) and (min-height: 550px) {
    grid-column: 1;
    grid-row: 1;
    height: 450px;
  }
`;

export const Card2 = styled.div`
  background-color: #fff;
  border-radius: 5px;
  grid-column: 7 / 13;
  grid-row: 1 / 7;

  @media (max-width: 1024px) and (min-height: 550px) {
    grid-column: 1;
    grid-row: 1;
    height: 450px;
  }
`;

export const Card3 = styled.div`
  grid-column: 1 / 7;
  grid-row: 7 / 13;
  background-color: #fff;
  border-radius: 5px;

  @media (max-width: 1024px) and (min-height: 550px) {
    grid-column: 1;
    grid-row: 3;
    height: 450px;
  }
`;

export const Card4 = styled.div`
  grid-column: 7 / 13;
  grid-row: 7 / 13;
  background-color: #fff;
  border-radius: 5px;

  @media (max-width: 1024px) and (min-height: 550px) {
    grid-column: 1;
    grid-row: 4;
    height: 450px;
    margin-bottom: 23px;
  }
`;

export const Text = styled.h3`
  color: #000;
  margin: 10px 13px;
  font-weight: 500;
`;
