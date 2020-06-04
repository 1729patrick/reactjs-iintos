import styled from 'styled-components';

export const Container = styled.div `
  width: 100%;
  display: flex;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
export const Title = styled.div `
  font-weight: 600;
  width: 250px;

  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
`;

export const Menu = styled.div `
  min-width: 16%;
  height: 100%;
  position: fixed;
  height: 100%;

  div {
    margin-top: 60px;
    padding-left: 50px;
    font-size: 16px;

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
        color: rgb(239, 108, 0) !important;
        border-radius: 4px 50px 50px 4px;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    padding: 0 30px;
    max-width: 100%;
    position: unset;

    div {
      padding: 0;
      margin-top: 15px;

      a + a {
        margin-top: 10px;
      }
    }
  }
`;

export const Content = styled.div `
  width: 100%;
  padding: 0 30px 0 calc(16% + 30px);

  h1 {
    display: flex;
  }

  img {
    margin: 0 auto;
  }

  @media only screen and (max-width: 700px) {
    padding-left: 30px;
  }
`;