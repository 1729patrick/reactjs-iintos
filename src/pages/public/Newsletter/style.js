import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  text-align: justify;

  background-image: url('Images/old-newspaper-350376_1920.png');
  background-size: cover;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  max-width: 23%;
  position: fixed;
  height: 100%;
  width: 23%;

  div {
    h1 {
      margin-bottom: 10px;
      margin-right: 10px;
    }
    margin-top: 15px;
    padding-left: 50px;
    font-size: 16px;

    a {
      display: flex;
      height: 40px;
      align-items: center;
      color: #444;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      max-width: 300px;

      p {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 230px;
      }

      & + a {
        margin-top: 25px;
      }
      & + button {
        margin-top: 25px;
      }

      &.active {
        background: #ddd;
        color: rgb(239, 108, 0) !important;
        border-radius: 4px 50px 50px 4px;
      }
    }

    span {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  @media only screen and (max-width: 600px) {
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
  padding: 15px 30px 15px calc(23% + 30px);
  width: 100%;

  @media only screen and (max-width: 600px) {
    padding: 30px;
    text-align: justify;

    span {
      flex-direction: column;
      margin-bottom: 30px;
      align-items: flex-end;
    }
  }
`;
