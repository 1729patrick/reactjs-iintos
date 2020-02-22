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
    border-radius: 4px;
    border: none;
    background: ${props => props.background || '#eee'};
    padding: 0 16px;

    option {
      font-weight: 500;
      color: #444;
    }
  }

  input {
    height: 40px;
  }

  textarea {
    padding-top: 9px;
  }
`;
