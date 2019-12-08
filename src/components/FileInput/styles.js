import styled from 'styled-components';

export const Container = styled.div`
  div {
    width: 100%;
    flex: 1;
    height: 40px;
    border-radius: 4px;
    border: none;
    background: #eee;

    font-weight: 500;
    color: #444 !important;
    font-size: 15px;
    position: relative;

    p {
      text-align: center;
      line-height: 40px;
    }

    input {
      position: absolute;
      opacity: 0;
      top: 0;
      height: 100%;
      cursor: pointer;
    }
  }

  span {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    label {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
    }

    p {
      font-weight: 500;
      color: #ff0000;
    }
  }
`;
