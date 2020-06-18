import styled from 'styled-components';

export const Container = styled.div`
  background-image: url('Images/stem.jpg');
  background-size: cover;

  width: 100%;
  text-align: justify;
  text-align: center;

  h1 {
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 40px;
  }

  div {
    svg {
      float: right;
      margin-top: 10px;
      margin-right: 15px;
    }
  }

  p {
    font-weight: 500;
    font-size: 20px;
    text-align: center;
  }

  ul {
    margin-top: 20px;
    font-size: 25px;

    li {
      margin-top: 10px;
      font-size: 20px;
      svg {
        margin-left: 10px;
      }
    }
  }
`;
