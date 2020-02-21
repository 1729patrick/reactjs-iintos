import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export const Menu = styled.div`
  min-width: 22%;

  div {
    margin-top: 60px;
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
`;

export const Content = styled.div`
padding-right:100px;
padding-left:20px;


	div{
		width:80%;
		display: flex;
    flex-direction: column;
		margin:0 auto;
		text-align:justify;
	}

	h1{
		display:flex;
		margin-top:14px;	
	}

	img{
		margin:0 auto;
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
`;