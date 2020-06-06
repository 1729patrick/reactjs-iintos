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
    margin-top: -100px;
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

export const Info = styled.div`
  background: #f1f4fa;
  border-radius: 8px;
  width: 80%;
  margin: 0 auto;
  margin-top: -100px;
  z-index: 100;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: auto !important;
  margin-bottom: 50px;
  box-shadow: 0 1px 20px 0 rgba(46, 61, 73, 0.2);

  > p {
    margin: 15px 0;
    font-size: 17px;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;
    padding-top: 20px;

    span {
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      flex: 1;
      margin: 1px;
      text-align: center;

      h3 {
        margin-top: 15px;
        margin-bottom: 5px;
      }

      p {
        color: #444;
      }
    }
  }
`;

export const Work = styled.section`
  margin-top: 50px;
  width: 70%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    margin: 20px 0;
    font-size: 17px;
    color: #444;
  }
`;
