import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  div {
    padding: 60px;
    background: #fff;
    border-radius: 4px;
    text-align: center;

    p {
      font-weight: 500;
      color: #000;
      font-size: 16px;

      & + p {
        margin-top: 10px;
        color: #444;
      }
    }
  }
`;
