import React from 'react';

import { PublicContainer as Container } from '~/styles/Sidebar';

function UserGuide() {
  return (
    <Container>
      <h1>User Guide</h1>
      <p>
        This guide is a guiding document for completing the various steps
        proposed for the implementation of a European office in schools.
        <br />
        <p>
          <a
            target="__blank"
            href="https://iintoska2.ips.pt/api/files/4f7657e25a3fe13d398caa9ef13fd692.pdf"
          >
            Download
          </a>
        </p>
      </p>
    </Container>
  );
}

export default UserGuide;
