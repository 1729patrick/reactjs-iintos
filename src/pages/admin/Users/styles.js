import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Menu = styled.div`
  width: 18%;

  div {
    margin-top: 60px;
    padding-left: 50px;

    a {
      display: flex;
      height: 40px;
      align-items: center;

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
  flex: 1;
`;
