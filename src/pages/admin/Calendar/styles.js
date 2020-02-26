import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerWrap = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  width: 78%;
  padding-top: 20px;
  > .fc {
    padding-bottom: 30px;
  }

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
