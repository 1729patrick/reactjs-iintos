import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import Menu from '../Menu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (menuOpen) {
    return <Menu onClose={() => setMenuOpen(false)} />;
  }

  return (
    <Container>
      <NavLink to="/">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partners">Partners</NavLink>
          {/* <NavLink to="/news">News</NavLink> */}

          <NavLink to="/results">Results</NavLink>

          <NavLink to="/login">Login</NavLink>
        </div>
      </div>

      <MenuIcon onClick={() => setMenuOpen(true)} />
    </Container>
  );
};

export default Header;
