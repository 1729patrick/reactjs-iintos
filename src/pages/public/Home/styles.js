import styled from 'styled-components';

export const Container = styled.div`
  background: url('https://cdn.pixabay.com/photo/2016/08/02/23/52/bag-1565402_960_720.jpg');
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background: #000;
    height: 100%;
    width: 100%;
    opacity: 0.5;
    position: absolute;
  }

  span {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      color: #fff;
      font-size: 55px;
      font-weight: 500;
    }

    h1 {
      color: #fff;
      font-size: 40px;
      font-weight: 400;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;
