import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Menu = styled.div`
  min-width: 22%;

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
        background: #ddd;
        color: rgb(239, 108, 0) !important;
        border-radius: 4px 50px 50px 4px;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 30px;

  h1 {
    display: flex;
    margin-top: 14px;
  }

  img {
    margin: 0 auto;
  }
`;
