import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  span {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    label {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
      margin-left: 10px;
    }

    p {
      font-weight: 500;
      color: #ff0000;
    }
  }
  input {
    cursor: pointer;
  }
`;
