import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 130px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerWrap = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  width: 78%;
  padding-top: 20px;

  .MuiAlert-message {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    a {
      margin-left: auto;
    }
  }
`;
