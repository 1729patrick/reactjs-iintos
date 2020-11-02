import React from 'react';
import Button from '../../../components/Button';
import { Container, Info, Work } from './styles';

import SchoolIcon from '@material-ui/icons/School';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { withRouter } from 'react-router-dom';

const Home = ({ history }) => {
  const openRegister = () => {
    history.push('/signup');
  };

  return (
    <>
      <Container>
        <div />

        <span>
          <p>IINTOS</p>
          <h1>Implementation of International Offices in Schools</h1>
        </span>
      </Container>
      <Info>
        <h1>What's this all about?</h1>
        <p style={{ textAlign: 'center' }}>
          The aim of this project is to develop international teaching and
          learning processes that lead our main target groups, teachers,
          students and schools stakeholders, able to make the schools more
          international and at the same time raise the competence levels in STEM
          education.
        </p>

        <div>
          <span>
            <SchoolIcon color="primary" style={{ fontSize: 45 }} />
            <h3>IINTOS Project</h3>
            <p>See what outputs we have done</p>
          </span>

          <span>
            <HomeWorkIcon style={{ color: '#e65100', fontSize: 45 }} />
            <h3>International Offices</h3>
            <p>Learn how you can create your mobility office in your school</p>
          </span>

          <span>
            <VerifiedUserIcon style={{ color: '#00655c', fontSize: 45 }} />
            <h3>International Projects</h3>
            <p>We are a platform that host multiple mobility projects</p>
          </span>
        </div>

        <Work>
          <h1>Work with us!</h1>
          <p>
            You can register in our platform and your international sucess with
            us. You'll have access to a wonderfull community of schools ready to
            make partnerships.
          </p>
          <Button title="Create Your Account" onClick={openRegister} />
        </Work>

        <div style={{ width: '100%' }}>
          <img
            src={require('~/assets/images/erasmus.png')}
            style={{ width: 200, borderRadius: 0 }}
          />
        </div>
      </Info>
    </>
  );
};

export default withRouter(Home);
