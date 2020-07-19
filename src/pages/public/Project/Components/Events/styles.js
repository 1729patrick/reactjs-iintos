import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  h1 {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .MuiExpansionPanel-root {
    margin: 15px 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0 !important;
  }

  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0px;
    text-transform: uppercase;

    span {
      color: #444;
      font-size: 14px;
    }
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > span {
    display: flex;
    margin-right: 30px;
    justify-content: space-between;
    align-items: center;

    img {
      border: 1px solid #eee;
      max-width: 35%;
      max-height: 400px;
      margin-top: auto;
      margin: 0 auto;
      margin-right: 15px;
    }

    textarea {
      width: 64%;
    }
  }

  textarea {
    flex: 1;
    border: none;
    height: 600px;
    line-height: 1.5;
    color: #444;
    background: #fff;
    width: 100%;
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
      color: #444;
      font-size: 15px;
      font-weight: 400;
      margin-left: auto;
      display: flex;
    }

    span {
      color: #555;
    }
  }

  div {
    a {
      margin-right: 10px;
    }
  }
`;
