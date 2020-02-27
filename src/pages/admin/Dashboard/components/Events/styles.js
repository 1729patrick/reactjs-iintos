import styled from 'styled-components';

export const Events = styled.div`
  padding: 0 15px;
  margin-top: 10px;
  overflow-y: auto;
  height: 100%;
`;

export const Event = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  background: #ddd;
  padding: 10px;
  border-radius: 4px;

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
`;
