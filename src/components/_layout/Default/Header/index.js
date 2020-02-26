import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';

const Header = () => {
  return (
    <Container>
      <NavLink to="/">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partners">Partners</NavLink>
          <NavLink to="/news">News</NavLink>

          <NavLink to="/results">Results</NavLink>

          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Header;
