import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  background: #fff;
  width: 100%;
  height: calc(100% + 50px);
  margin-top: -50px;
  z-index: 100;

  header {
    display: flex;

    svg {
      margin-left: auto;
      height: 40px;
      width: 40px;
      margin-right: 30px;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-weight: 500;

    a {
      color: #222;
      font-size: 18px;
      padding: 3px 0;
      border-bottom: solid 2px transparent;

      & + a {
        margin-top: 30px;
      }

      &.active {
        border-color: #222;
      }
    }
  }
`;
