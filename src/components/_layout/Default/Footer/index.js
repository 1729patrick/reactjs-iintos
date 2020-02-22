import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Footer = () => {
  return (
    <Container>
      <footer>
        <div>
          © 2020 - IINTOS - <Link to="/">Privacy</Link> - Platform
          Underdevelopment
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
