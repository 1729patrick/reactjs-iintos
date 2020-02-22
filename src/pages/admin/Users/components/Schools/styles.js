import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 30px;
`;

export const ContainerWrap = styled.div`
  width: 100%;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 15px 0;
    }
  }
`;
