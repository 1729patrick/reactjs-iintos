import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow-y: auto;
`;

export const Content = styled.div`
  margin-top: 120px;
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 30px 40px;
  flex-direction: column;
  display: flex;
  overflow: hidden;

  h1 {
    margin-bottom: 30px;
  }

  form {
    div + div {
      margin-top: 10px;
    }

    button {
      margin-top: 30px;
      width: 100%;
    }
  }

  > p {
    text-align: center;

    a {
      color: #0c1e3f;
      font-weight: 500;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 600px) {
    margin-top: 190px;
  }
`;
