import React, { useMemo, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useUserContext } from '~/context/UserContext';

import { Container } from './styles';
import HelpModal from '../Default/Header/HelpModal';
import { toast } from 'react-toastify';
import api from '~/services/api';

const Footer = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useCallback(useUserContext(), []);
  const date = useMemo(() => new Date().getFullYear(), []);
  const isGroupSchool = useMemo(() => {
    return user?.role === 'Coordinator' || user?.role === 'Teacher';
  }, [user]);

  const isGroupAdmin = useMemo(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin' ||
      user?.role === 'IINTOS-Partner'
    );
  }, [user]);

  const handleHelpSubmit = async values => {
    try {
      await api.post('helpEmail', values);
      setModalOpen(false);
      toast.success('Email sent with success, thanks for the feedback');
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // Function that opens the Help modal
  const onClickHelp = () => {
    setModalOpen('Help');
  };

  return (
    <Container>
      <div style={{ zIndex: 100 }}>
        <p>
          © {date} - <span>IINTOS -</span> <Link to="/privacy">Privacy</Link>
        </p>

        {links && (
          <div>
            <NavLink to="/iproject">IINTOS Project</NavLink>
            <NavLink to="/ioffices">International Offices</NavLink>
            <NavLink to="/iprojects">International Projects</NavLink>

            <NavLink to="/knowledge">Knowledge base</NavLink>

            <a onClick={onClickHelp} style={{ cursor: 'pointer' }}>
              Contact
            </a>
          </div>
        )}
      </div>
      <HelpModal
        open={modalOpen === 'Help'}
        setOpen={setModalOpen}
        initialValues={user}
        onSubmit={handleHelpSubmit}
        modalTitle="FeedBack"
      />
    </Container>
  );
};

export default Footer;
