import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import { toast } from 'react-toastify';

import { Container } from './styles';
import Logo from '~/assets/images/logo.png';
import { useUserContext } from '~/context/UserContext';
import api from '~/services/api';
import apiCalendar from '~/services/apiCalendar';
import Menu from '../Menu';
import Popup from '../Popup';
import Privacy from './PrivacyModal';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, setUser, token, school } = useUserContext();

  const logout = () => {
    localStorage.clear();
    setUser({
      user: null,
      school: null,
      token: null,
    });

    api.defaults.headers.authorization = null;
    apiCalendar.defaults.headers.userID = null;
  };

  const isGroupAdmin = useMemo(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const isGroupSchool = useMemo(() => {
    return user?.role === 'Coordinator' || user?.role === 'Teacher';
  }, [user]);

  const handlePrivacySubmit = async values => {
    try {
      const updatedUser = await api.put(`/users/${user.id}`, values);

      setModalOpen(false);

      localStorage.setItem('user', JSON.stringify(updatedUser.data));
      setUser({
        token,
        school,
        user: updatedUser.data,
      });
      // toast.success('Email sent with success, thanks for the feedback');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  React.useEffect(() => {
    if (user.isPrivacy === false) {
      setModalOpen('Privacy');
    }
  }, [user.isPrivacy]);

  return (
    <>
      <Container>
        <NavLink to="/dashboard">
          <img src={Logo} alt="" style={{ width: 150 }} />
        </NavLink>

        <div>
          <div>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            {isGroupSchool && <NavLink to="/school">School</NavLink>}
            <a
              style={{ cursor: 'pointer' }}
              onClick={() =>
                window.open('https://iintoska2.ips.pt/forum', '_blank')
              }
            >
              Forum
            </a>

            {isGroupAdmin && <NavLink to="/outputs">Outputs</NavLink>}
            {isGroupAdmin && <NavLink to="/results">Results</NavLink>}
            {isGroupAdmin && <NavLink to="/events">Events</NavLink>}
            {isGroupAdmin && <NavLink to="/users">Users</NavLink>}
            <Popup logout={logout} user={user} />
          </div>
        </div>

        <MenuIcon onClick={() => setMenuOpen(true)} />
      </Container>
      {menuOpen && (
        <Menu
          onClose={() => setMenuOpen(false)}
          isGroupSchool={isGroupSchool}
          isGroupAdmin={isGroupAdmin}
          logout={logout}
        />
      )}

      <Privacy
        open={modalOpen === 'Privacy'}
        setOpen={setModalOpen}
        initialValues={user}
        onSubmit={handlePrivacySubmit}
        modalTitle="Privacy"
      />
    </>
  );
};

export default Header;
