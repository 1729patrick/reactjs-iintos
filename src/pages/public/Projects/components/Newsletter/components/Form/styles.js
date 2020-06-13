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
