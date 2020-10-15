import React from 'react';

import { PublicContainer as Container } from '~/styles/Sidebar';

function About() {
  return (
    <Container>
      <h1 style={{ marginBottom: 15 }}>About International Offices</h1>
      <p>
        An International office can provide schools a formal, structured and
        organized office for the development of international projects.
      </p>

      <p>
        Can be a formal structure at the school, reporting directly to the
        principal.
      </p>

      <p>
        Here you will find a set of steps that you should follow with suggested
        tasks that will help you create, structure and develop an international
        office in your school.
      </p>

      <p>
        It is also available a list of active International Offices in Schools.
      </p>
      <img
        src="https://iintoska2.ips.pt/api/files/12e5bbdf5b055a61e60f0ae2141fa10a.JPG"
        style={{ width: '90%', paddingBottom: 40 }}
      />
    </Container>
  );
}

export default About;
