import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  h1 {
    margin-top: 10px;
  }

  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0px;
    text-transform: uppercase;

    span {
      color: #666;
      font-size: 14px;
    }
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  textarea {
    width: 100%;
    border: none;
    height: 500px;
    line-height: 1.8;
    color: #666;
    background: #fff;
  }
`;

export const Session = styled.div`
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid #ddd;

  h1 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    text-transform: uppercase;

    p {
      color: #666;
      font-size: 15px;
      font-weight: 400;
      margin-left: auto;
      display: flex;
    }

    span {
      margin-left: 10px;
      color: #555;
    }
  }

  div {
    a {
      margin-right: 10px;
    }
  }
`;
