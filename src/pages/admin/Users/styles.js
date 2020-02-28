import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  width: 18%;

  div {
    margin-top: 70px;
    padding-left: 50px;

    a {
      display: flex;
      height: 40px;
      align-items: center;
      color: #444;
      font-weight: 500;

      & + a {
        margin-top: 25px;
      }

      &.active {
        background: #ddd;
        color: rgb(239, 108, 0) !important;
        border-radius: 4px 50px 50px 4px;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 0 30px;

    div {
      padding: 0;
      margin-top: 15px;

      a + a {
        margin-top: 10px;
      }
    }
  }
`;

export const Content = styled.div`
  flex: 1;
`;
