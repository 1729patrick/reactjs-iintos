import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 82px 22px 22px;

  button {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }

  div {
    /* margin-top: 50px; */
    font-size: 16px;

    a {
      display: flex;
      height: 40px;
      align-items: center;
      color: #444;
      font-weight: 500;

      & + a {
        margin-top: 25px;
      }

      &.active {
        background: #ddd;
        color: #3f51b5 !important;
        border-radius: 4px 50px 50px 4px;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    padding: 0 30px;
    max-width: 100%;
    position: unset;

    div {
      padding: 0;
      margin-top: 15px;

      a + a {
        margin-top: 10px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  form {
    flex: 1;
  }

  h1 {
    display: flex;
  }

  img {
    margin: 0 auto;
  }

  @media only screen and (max-width: 700px) {
    padding-left: 30px;
  }
`;

export const ContainerWrap = styled.div`
  width: 100%;
  padding: 22px;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    h1 {
      /* margin: 15px 0; */
    }
  }
`;

export const PublicContainer = styled.div`
  /* display: flex; */
  justify-content: center;
  padding: 25px 22px 22px;
  flex: 1;
  flex-direction: column;

  .MuiExpansionPanel-root {
    margin: 15px 0;
  }

  .MuiExpansionPanelSummary-content.Mui-expanded {
    margin: 0;
  }

  .MuiExpansionPanelDetails-root {
    padding-top: 0;
  }

  .MuiExpansionPanelSummary-content {
    margin: 0 !important;
  }

  div {
    text-align: justify;
  }

  > div {
    padding: 14px 0;
  }

  h1 {
    display: flex;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  textarea {
    width: 100%;
    border: none;
    height: 600px;
    font-size: 16px;
    line-height: 1.5;
    color: #444;
    background: #fff;
    text-align: justify;
  }

  @media only screen and (max-width: 600px) {
    div {
      width: 100%;
      padding: 0 30px;
      img {
        width: 100%;
      }
    }
  }
`;
