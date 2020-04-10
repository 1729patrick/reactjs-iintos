import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  button {
    margin-left: 10px;
  }
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
