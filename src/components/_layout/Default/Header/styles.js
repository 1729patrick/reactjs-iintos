import styled from 'styled-components';

export const Container = styled.header`
  height: 80px;
  background: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0 35px;

  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);

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
