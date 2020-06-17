import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;

  h1 {
    margin-bottom: 20px;
  }

  .MuiExpansionPanelSummary-content {
    align-items: center;
  }
  .MuiExpansionPanel-root {
    margin: 15px 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0 !important;
  }

  textarea {
    width: 100%;
    border: none;
    height: 600px;
    font-size: 16px;
    line-height: 1.5;
    color: #444;
    background: #fff;
  }
`;

export const Detail = styled.div`
  display: flex;
  width: 100%;

  img {
    margin-right: 15px;
    margin-left: 0;
  }
`;
