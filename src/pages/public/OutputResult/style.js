import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
`;

export const Menu = styled.div`
  max-width: 22%;
  position: fixed;
  height: 100%;

  div {
    h1 {
      margin-bottom: 10px;
    }

    margin-top: 15px;
    padding-left: 50px;
    font-size: 16px;

    a {
      display: flex;
      height: 40px;
      align-items: center;
      color: #444;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      max-width: 300px;

      & + a {
        margin-top: 25px;
      }
      & + button {
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
padding: 15px 30px 15px calc(22% + 30px);
width: 100%;

span{
	display:flex;
	justify-content: space-between;
	img{
		margin-top:24px;
		cursor:pointer
	}
}

	div{
		display: flex;
    flex-direction: column;
		margin:0 auto;
		text-align:justify;
	}

	h1{
		display:flex;
	}

	img{
		margin:24px auto 10px auto;
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
`;
