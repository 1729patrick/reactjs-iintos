import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      setUser(JSON.parse(userLocal));
    }
  }, []);
  const logout = () => {
    localStorage.clear();
  };

  return (
    <Container>
      <Link to="dashboard">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </Link>

      <div>
        <div>
          <Link to="about">About</Link>
          <Link to="partners">Partners</Link>
          <Link to="news">News</Link>
          <Link to="school">School</Link>
          <Link to="mobility">Mobility</Link>
          <Link to="project">Project</Link>
          <Link to="calendar">Calendar</Link>

          {user?.role === 'Admin' && (
            <>
              <Link to="iintos">IINTOS Area</Link>
              <Link to="admin">Admin Area</Link>
            </>
          )}

          <Link to="login" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Header;
