import styled from 'styled-components';

export const Content = styled.div`
  span {
    display: flex;
    justify-content: space-between;

    h1 {
      flex: 1;
      padding-right: 15px;
    }

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      svg {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
`;
