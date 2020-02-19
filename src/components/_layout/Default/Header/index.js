import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </Link>

      <div>
        <div>
          <Link to="about">About</Link>
          <Link to="partners">Partners</Link>
          <Link to="news">News</Link>

          <Link to="login">Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;
