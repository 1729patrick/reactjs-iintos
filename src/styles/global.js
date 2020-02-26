import { createGlobalStyle } from 'styled-components';

import fontMedium from '~/assets/fonts/GoogleSans-Medium.ttf';
import fontRegular from '~/assets/fonts/GoogleSans-Regular.ttf';

import './calendar.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  /* @import url('https://fonts.gstatic.com/s/productsans/v10/pxiDypQkot1TnFhsFMOfGShVF9eOYktMqg.woff2'); */

@font-face {
    font-family: 'Google Sans';
    src: url(${fontMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: 'Google Sans';
    src: url(${fontRegular}) ;
    font-weight: 400;
  }

  * {

    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *:focus {
    outline: 0
  }

  html, body, #root {
    height: 100%;
    background: #eaeaea;
    overflow-y: scroll;
  }

body {
  -webkit-font-smoothing: antialiased;

  @media screen and (max-width: 768px) {
    user-select: none;
  }
}

  body, input, button, textarea {
    font: 14px "Google Sans",Roboto,Arial,Helvetica,sans-serif;
    line-height: 1.71429;
    font-style: normal;
    font-weight: 300;
    line-height: 1.444;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  input::placeholder {
    font: 14px "Google Sans",Roboto,Arial,Helvetica,sans-serif;
    line-height: 1.71429;
    font-style: normal;
    font-weight: 500;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: #808080;

  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    background: transparent;
    border: none;
  }

  .MuiPaper-root {
    border-radius: 6px !important;
    overflow: hidden;
    box-shadow: none !important;
  }

  .MuiIconButton-root {
    margin-top: 0 !important;
  }

  .MuiFormControl-root {
    width: 100%;

    .MuiInput-root {
      height: 40px;
      border-radius: 4px;
      border: none;
      background: #eee;
      padding: 0 16px;
    }

    .MuiInputLabel-root {
      color: #444;
      margin-bottom: 4px;
      font-weight: 500;
    }
  }
`;
