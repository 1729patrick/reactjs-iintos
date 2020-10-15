import styled from 'styled-components';

export const Container = styled.div``;

export const Form = styled.form`
  padding: 22px;
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
