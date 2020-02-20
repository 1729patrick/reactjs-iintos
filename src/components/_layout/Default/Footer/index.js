import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Header = () => {
  return (
    <Container>
      <div className="phantom" />
      <footer>
        <div>
          © 2020 - IINTOS -<Link to="/">Privacy</Link>- Platform
          Underdevelopment
        </div>
      </footer>
    </Container>
  );
};

export default Header;
