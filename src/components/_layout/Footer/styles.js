import styled from 'styled-components';

export const Container = styled.footer`
  height: 65px;
  border-top: 2px solid #aaa;
  display: flex;
  align-items: center;
  padding: 0 40px;

  > div {
    display: flex;
    justify-content: row;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      align-items: center;
    }
  }

  a {
    color: #222;
    font-size: 15px;
    padding: 3px 0;
    border-bottom: solid 2px transparent;
    // line-height: 65px;

    & + a {
      margin-left: 30px;
    }

    &.active {
      border-color: #222;
    }
  }

  @media only screen and (max-width: 600px) {
    padding: 0 15px;

    div p span {
      display: none;
    }
  }

  @media only screen and (max-width: 1200px) {
    div {
      span {
        a {
          display: none;
        }

        a:last-child {
          display: inline;
        }
      }
    }
  }
`;
