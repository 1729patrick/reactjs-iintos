import styled from 'styled-components';

export const Container = styled.div`
  width: 170px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: 500;

  a {
    color: #222;
    font-size: 15px;
    padding: 3px 0;

    & + a {
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #eee;
    }
  }
`;

export const Icon = styled.div`
  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    margin-left: 10px;
    border: 2px solid #aaa;
    cursor: pointer;
    background: #ddd;
  }
`;
export const NameDiv = styled.div`
  font-weight: 500;
  color: #444;
`;
