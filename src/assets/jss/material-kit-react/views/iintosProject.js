import { container, title } from '~/assets/jss/material-kit-react';

import imagesStyle from '~/assets/jss/material-kit-react/imagesStyles';

const profilePageStyle = {
  container,
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
    },
  },
  section: {
    padding: '70px 0',
    textAlign: 'center',
    paddingRight: '100px',
    paddingLeft: '100px',
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important',
    fontSize: '15px',
  },
  name: {},
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-230px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    fontSize: '50px',
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999',
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center',
  },
};

export default profilePageStyle;
