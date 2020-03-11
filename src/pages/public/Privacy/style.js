import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  text-align: justify;

  h1 {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  span {
    margin-left: 10em;
    margin-right: 10em;
    span {
      margin-bottom: 10px;
    }
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
