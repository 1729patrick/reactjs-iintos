import React from 'react';

import { PublicContainer as Container } from '~/styles/Sidebar';

function Goals() {
  return (
    <Container>
      <h1 style={{ marginBottom: 15 }}>Goals and organization</h1>

      <ul>
        <li>
          International office in school, ​aims to encourage, facilitate, help
          and promote the internationalization of the school at the national,
          European and international level.
        </li>

        <li style={{ marginTop: 15 }}>
          Promote inclusion, cooperation, social, digital and language skills.
          Promote global citizenship and employability.
        </li>

        <li style={{ marginTop: 15 }}>
          An office where projects of international scope are selected,
          disseminated and created.
        </li>

        <li style={{ marginTop: 15 }}>
          It can dynamize of international agreements with other schools and
          associated activities.
        </li>

        <li style={{ marginTop: 15 }}>
          Accordance with the school project, be part of pre-established goals.
        </li>

        <li style={{ marginTop: 15 }}>
          This office must exist as a formal structure in the school, reporting
          directly to the principal.
        </li>

        <li style={{ marginTop: 15 }}>
          Whenever possible it can be installed in a physical space with support
          materials, such as tables, chairs, computers and other material that
          facilitate the work of the human resources allocated to the office.
        </li>

        <li style={{ marginTop: 15 }}>
          Teachers must be from different areas.
        </li>
      </ul>
    </Container>
  );
}

export default Goals;
