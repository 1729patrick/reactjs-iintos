import styled from 'styled-components';

export const Form = styled.form`
  padding-top: 30px;

  div + div {
    margin-top: 10px;
  }
  > button {
    margin-top: 30px;
    width: 100%;
  }

  h3 {
    margin: 20px 0 10px 0;
    font-weight: 500;
  }
  span {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        flex: 1;
      }
      svg {
        margin-left: 15px;
      }
    }

    > button {
      margin-top: 10px;
      width: 100%;
    }

    > label {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
      margin-top: 10px;
      display: block;
    }
  }
`;

export const Circle = styled.div`
  position: absolute;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  border: solid 2px #eee;
  box-shadow: 0 1px 20px 0 rgba(46, 61, 73, 0.2) !important;
`;
