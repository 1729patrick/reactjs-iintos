import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import { useUserContext } from '~/context/UserContext';

const Header = () => {
  const { user, setUser } = useCallback(useUserContext(), []);

  const logout = () => {
    localStorage.clear();
    setUser({
      user: null,
      school: null,
      token: null,
    });
  };

  const isGroupAdmin = useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const isGroupSchool = useCallback(() => {
    return user?.role === 'Coordinator' || user?.role === 'Professor';
  }, [user]);

  return (
    <Container>
      <NavLink to="/dashboard">
        <img src={Logo} alt="" style={{ width: 150 }} />
      </NavLink>

      <div>
        <div>
          <NavLink to="/projects">Projects</NavLink>
          {isGroupAdmin() && <NavLink to="/outputs">Outputs</NavLink>}
          <NavLink to="/results">Results</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>
          {isGroupAdmin() && <NavLink to="/users">Users</NavLink>}
          {isGroupSchool() && <NavLink to="/school">School</NavLink>}

          <NavLink to="/login" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Header;
