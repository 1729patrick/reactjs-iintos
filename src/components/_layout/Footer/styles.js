import styled from 'styled-components';

export const Container = styled.footer`
  height: 40px;
  border-top: 2px solid #aaa;
  display: flex;
  align-items: center;
  padding: 0 40px;

  > div {
    display: flex;
    justify-content: row;
    justify-content: space-between;
    width: 100%;
  }

  a {
        color: #222;
        font-size: 15px;
        padding-bottom: 3px;
        border-bottom: solid 2px transparent;

        & + a {
          margin-left: 30px;
        }

        &.active {
          border-color: #222;
        }
      }
    }
`;
