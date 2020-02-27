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
      width: 100%;
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
      white-space: nowrap;
    }

    p {
      font-weight: 500;
      color: #ff0000;
      white-space: nowrap;
    }
  }
`;

export const NoImage = styled.div`
  height: 150px;
  width: 150px;
  min-height: 150px;
  min-width: 150px;
  border-radius: 50%;
  background: #ccc;
  position: relative;
  border: 2px solid #aaa;
  overflow: hidden;

  align-items: center;
  justify-content: center;
  display: flex;

  svg {
    height: 45px;
    width: 45px;
    color: #444;
  }

  input {
    position: absolute;
    opacity: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`;
