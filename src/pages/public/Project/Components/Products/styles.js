import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    padding: 0 12px;
    background-color: #fff;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;

    span {
      cursor: pointer;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    a {
      margin-bottom: 10px;
    }
  }

  .MuiCollapse-wrapper {
    margin-bottom: 0;
  }

  h1 {
    margin-bottom: 20px;
  }
`;
