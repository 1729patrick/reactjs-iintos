import styled from 'styled-components';

export const Form = styled.form`
  padding-top: 30px;
  div + div {
    margin-top: 10px;
  }
  button {
    margin-top: 30px;
    width: 100%;
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      width: 47%;
      margin: 10px 0;
    }
  }
`;
