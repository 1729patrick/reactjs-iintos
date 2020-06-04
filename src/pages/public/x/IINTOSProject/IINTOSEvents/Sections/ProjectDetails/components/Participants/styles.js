import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ContainerWrap = styled.div`
  width: 100%;

  h1 {
    margin-top: 15px;
  }

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      margin-left: auto;
    }

    h2 {
      margin: 15px 0;
    }
  }

  h2 {
    font-weight: 500;
  }
`;
