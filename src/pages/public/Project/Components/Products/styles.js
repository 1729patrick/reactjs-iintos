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
  flex-direction: column;
  flex: 1;

  img {
    margin-right: 15px;
  }

  textarea {
    width: 100%;
    border: none;
    background: #fff;
    width: 100%;
    border: none;
    line-height: 1.5;
    color: #444;
    margin-bottom: 15px;
  }
`;
