import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export const Menu = styled.div`
  height: 100%;
  text-align: left;
  padding: 30px 40px;
  width: 22%;
  background: #fff;
  box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.2);
  font-size: large;
  

  p {
    indent-text: 15em;
  }
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

    > p {
      text-align: center;
      margin-top: 30px;

      a {
        color: #0c1e3f;
        font-weight: 500;
        cursor: pointer;
      }
    }

    button {
      margin-top: 30px;
      width: 100%;
    }
  }
`;
