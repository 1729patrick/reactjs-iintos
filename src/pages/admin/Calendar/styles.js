import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;

export const ContainerWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 100px;
  > .fc {
    height: 100%;
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
