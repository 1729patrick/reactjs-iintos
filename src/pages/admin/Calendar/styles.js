import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ContainerWrap = styled.div`
  height: 100%;
  width: 78%;
  padding-top: 20px;

  .MuiAlert-message {
    display: flex;
    flex-direction: row;

    a {
      margin-left: 12px;
    }
  }
`;
