import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  h1 {
    margin-bottom: 20px;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex: 1;

  img {
    margin-right: 15px;
  }

  textarea {
    width: 100%;
    flex: 1;
    border: none;
    height: 500px;
    line-height: 1.8;
    background: #fff;
  }
`;
