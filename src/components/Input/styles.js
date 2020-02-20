import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  span {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    label {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
    }

    p {
      font-weight: 500;
      color: #ff0000;
    }
  }

  input,
  textarea {
    height: 40px;
    border-radius: 4px;
    border: none;
    background: #eee;
    padding: 0 16px;

    option {
      font-weight: 500;
      color: #444;
    }
  }
`;
