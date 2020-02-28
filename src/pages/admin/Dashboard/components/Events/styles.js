import styled from 'styled-components';

export const Events = styled.div`
  padding: 0 15px;
  margin-top: 10px;
  overflow-y: auto;
  height: calc(100% - 58px);
`;

export const Event = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  background: #ddd;
  padding: 10px;
  border-radius: 4px;
  overflow: hidden;

  & + div {
    margin-top: 15px;
  }

  div {
    > span {
      margin-right: 15px;
    }

    span {
      color: #777;
    }
  }

  a {
    white-space: nowrap;
  }
`;
