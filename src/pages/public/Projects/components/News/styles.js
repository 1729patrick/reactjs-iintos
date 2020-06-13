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
    margin-bottom: 15px;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0 !important;
  }
`;

export const Detail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  img {
    max-width: 450px;
    max-height: 450px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  textarea {
    width: 100%;
    border: none;
    background: #fff;
    width: 100%;
    border: none;
    line-height: 1.5;
    color: #666;
    margin-bottom: 15px;
  }
`;
