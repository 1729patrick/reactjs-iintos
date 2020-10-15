import React from 'react';

import { PublicContainer as Container } from '~/styles/Sidebar';

function UserGuide() {
  return (
    <Container>
      <h1>User Guide</h1>
      <p>
        This guide is a guiding document with the various steps proposed for the
        implementation of International Projects in schools.
        <br />
        <p>
          <a
            target="__blank"
            href="https://iintoska2.ips.pt/api/files/62b9ae9fea15be6f2c1abc7ecc5b049c.pdf"
          >
            Download
          </a>
        </p>
      </p>
    </Container>
  );
}

export default UserGuide;
