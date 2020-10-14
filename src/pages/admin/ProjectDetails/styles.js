import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
export const Title = styled.h2`
  font-weight: 500;
  width: 250px;
  margin-top: 18px;

  @media only screen and (max-width: 1200px) {
    width: 150px;
  }
`;

export const Menu = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 22px;

  button {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }

  div {
    margin-top: 50px;
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

export const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 22px;
  height: 100%;

  form {
    flex: 1;
  }

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
