import styled from 'styled-components';

export const Container = styled.div``;

export const Form = styled.form`
  padding-top: 30px;
  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    svg {
      cursor: pointer;
    }
  }
  div + div {
    margin-top: 10px;
  }
  button {
    margin-top: 30px;
    width: 100%;
  }
`;
