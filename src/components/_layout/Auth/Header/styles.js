import styled from 'styled-components';

export const Container = styled.header`
  height: 80px;
  background: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 35px;

  > a {
    font-size: 32px;
    color: #ddd;
    cursor: pointer;

    align-items: center;
    height: 100%;
    display: flex;
  }

  div {
    align-items: center;
    display: flex;
    margin-left: auto;

    div {
      display: flex;
      flex-direction: row;

      a {
        color: #222;
        font-size: 15px;
        padding-bottom: 3px;
        border-bottom: solid 2px transparent;

        & + a {
          margin-left: 30px;
        }

        &.active {
          border-color: #222;
        }
      }
    }
  }
`;
