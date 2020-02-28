import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  min-width: 22%;
  position: fixed;
  height: 100%;
  position: fixed;
  height: 100%;

  div {
    margin-top: 25px;
    padding-left: 50px;
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
        color: rgb(239, 108, 0) !important;
        border-radius: 4px 50px 50px 4px;
      }
    }
  }

  @media only screen and (max-width: 600px) {
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
padding-right:100px;
padding-left:22%;


	div{
    padding-top: 15px;
		width:80%;
		display: flex;
    flex-direction: column;
		margin:0 auto;
		text-align:justify;
	}

	h1{
		display:flex;
	}

	img{
		margin:20px auto 6px auto;
		border-radius: 8px;
	}
ul{
	display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
li{
	display: list-item;
    text-align: -webkit-match-parent;
}
	h{
		display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
	}
	h4{
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

  @media only screen and (max-width: 600px) {
    padding: 0;
    text-align: justify;

    span {
      flex-direction: column;
      margin-bottom: 30px;
      align-items: flex-end;
    }
  }
`;
