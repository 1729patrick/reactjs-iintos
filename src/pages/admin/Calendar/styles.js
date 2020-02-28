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
    margin-bottom: 25px;
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

  @media only screen and (max-width: 600px) {
    padding: 0 15px;

    .fc-toolbar {
      margin: 20px 0 !important;
    }

    .fc-left,
    .fc-right,
    .fc-center {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
  }
`;
