import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 60px;
`;

export const Content = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 30px 40px;
  justify-content: space-between;
  flex-direction: column;
  display: flex;

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
`;