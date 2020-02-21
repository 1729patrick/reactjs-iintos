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

  .MuiFormControl-root {
    width: 100%;

    .MuiInput-root {
      height: 40px;
      border-radius: 4px;
      border: none;
      background: #eee;
      padding: 0 16px;
    }

    .MuiInputLabel-root {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
    }
  }
`;
