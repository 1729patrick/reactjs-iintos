import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import HelpModal from './HelpModal';
import { useUserContext } from '~/context/UserContext';

const schools = [
  {
    name: 'IPS',
    contacts: [
      {
        name: 'José Miguel Freitas',
        email: 'jose.freitas@ese.ips.pt',
      },
    ],
    address: (
      <p>
        Escola Superior de Educação
        <br />
        Campus do IPS, Estefanilha
        <br />
        2914 - 504 Setúbal | Portugal
      </p>
    ),
    phone: '+351 265 710 800',
  },
  {
    name: 'UPOL',
    contacts: [
      {
        name: 'Alena Jůvová',
        email: 'alena.juvova@upol.cz',
      },
      {
        name: 'Ondřej Duda',
        email: 'ondrej.duda@upol.cz',
      },
    ],
    address: (
      <p>
        Palacký University Olomouc
        <br />
        Křížkovského 511/8
        <br />
        CZ-779 00 Olomouc
        <br />
        Czech Republic
      </p>
    ),
    phone: '+420 585 631 111',
  },
  {
    name: 'AEJS',
    contacts: [
      {
        name: 'Faisal Aboobakar',
        email: 'faisal.aboobakar@aejs.pt',
      },
      {
        name: 'Marco Antunes',
        email: 'marco.antunes@aejs.pt',
      },
    ],
    address: (
      <p>
        Agrupamento de Escolas José Saramago, Palmela
        <br />
        Rua do Povo Unido S/N
        <br />
        2965-327 Poceirão | Portugal
      </p>
    ),
    phone: '+351 265 710 800',
  },
  {
    name: 'Vallauri',
    contacts: [
      {
        name: 'Silvia Tobaldi',
        email: 'silvia.tobaldi@vallauri.edu',
      },
      {
        name: 'Vilma Osella',
        email: 'vilma.osella@vallauri.edu',
      },
    ],
    address: (
      <p>
        Istituto Istrucione Superiore “G. Vallauri” – Fossano
        <br />
        Via San Michele, 68
        <br />
        12045 Fossano (CN)
      </p>
    ),
    phone: '+39 0172 694969',
  },
];

const Contacts = () => {
  const { user } = useCallback(useUserContext(), []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 120,
        paddingBottom: 40,
      }}
    >
      <h1>Contact Us</h1>

      <div style={{ marginTop: 15, minWidth: '40%' }}>
        {schools.map(school => (
          <div
            style={{
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: '1px solid #bbb',
            }}
          >
            <p style={{ marginBottom: 5 }}>
              <b>{school.name}</b>
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              {school.contacts.map(contact => (
                <div>
                  <p>{contact.name}</p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              ))}
            </div>
            <p>{school.address}</p>
            <a href={`tel:${school.phone}`}>{school.phone}</a>
          </div>
        ))}
        <a
          onClick={onClickHelp}
          style={{
            cursor: 'pointer',
            color: 'blue',
            marginTop: 40,
          }}
        >
          Give us some feedback
        </a>
      </div>

      <HelpModal
        open={modalOpen === 'Help'}
        setOpen={setModalOpen}
        initialValues={user}
        onSubmit={handleHelpSubmit}
        modalTitle="FeedBack"
      />
    </div>
  );
};

export default Contacts;
