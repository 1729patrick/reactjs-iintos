import React, { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

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

  const showUsers = useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin'
    );
  }, [user]);

  const showSchool = useCallback(() => {
    return user?.role === 'Coodinator' || user?.role === 'Professor';
  }, [user]);

  return (
    <Container>
      <NavLink to="dashboard">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/partners/IPS">Partners</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>

          {showUsers() && <NavLink to="/users">Users</NavLink>}
          {showSchool() && <NavLink to="/school">School</NavLink>}

          <NavLink to="/login" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Header;
