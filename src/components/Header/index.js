import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Header = () => {
  return (
    <Container>
      <Link to="dashboard">IINTOS</Link>

      <div>
        <div>
          <Link to="calendar">Calendar</Link>
          <Link to="tasks">Tasks</Link>
          <Link to="partners">Partners</Link>
          <Link to="news">News</Link>
          <Link to="forum">Forum</Link>
          <Link to="wiki">Wiki</Link>
        </div>

        <img src="" alt="" />
      </div>
    </Container>
  );
};

export default Header;
