import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 22%;
  background: #fff;
  box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.2);
  padding: 15px;
  overflow: hidden;

  p {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const Itens = styled.div`
  border-top: 2px solid #aaa;
  padding-top: 10px;
  margin-top: 10px;
  overflow-y: auto;
  height: 100%;
`;

export const Item = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 7px;
    padding-top: 7px;
    border-top: 1px solid #e1e1e1;
  }

  span {
    color: #777;
  }
`;
