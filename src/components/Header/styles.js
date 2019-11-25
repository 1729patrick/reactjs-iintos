import styled from 'styled-components';

export const Container = styled.header`
  height: 80px;
  background: #0c1e3f;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 35px;

  > a {
    font-size: 32px;
    color: #ddd;
  }

  div {
    align-items: center;
    display: flex;
    margin-left: auto;

    div {
      display: flex;
      flex-direction: row;

      a {
        color: #ddd;
        font-size: 15px;

        & + a {
          margin-left: 30px;
        }
      }
    }

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-left: 40px;
      background: #fff;
    }
  }
`;
