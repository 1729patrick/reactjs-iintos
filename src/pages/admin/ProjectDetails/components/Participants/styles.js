import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  flex-direction: column;
`;

export const ContainerWrap = styled.div`
  width: 100%;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    button {
      margin: 15px 0 15px auto;
    }
  }

  h2 {
    font-weight: 500;
  }
`;
