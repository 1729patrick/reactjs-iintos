import React from 'react';

import { PublicContainer as Container } from '~/styles/Sidebar';

function Policy() {
  return (
    <Container>
      <h1 style={{ marginBottom: 15 }}>School policy plan</h1>
      <p>
        An international office must be anchored in a development plan for the
        internationalization of the Group / school.
      </p>

      <p>
        All groupings or schools necessarily have an educational project
        appropriate to the needs and objectives of the school community and
        which defines the direction to be followed.
      </p>

      <p>
        In this educational project, the guiding principles for the preparation
        of the Strategic Development Plan for internationalization (SDPI) must
        be registered.{' '}
      </p>

      <p>
        The internationalization policy must be provided for in this document,
        which is approved by the general council after the opinion of the
        pedagogical council.
      </p>

      <p>The development plan for internationalization must include:</p>
      <ul>
        <li>The characterization of the group of schools.</li>
        <li style={{ marginTop: 15 }}>
          Objectives of the Strategic Development Plan for internationalization.
        </li>
        <li style={{ marginTop: 15 }}>
          Lines of action (ctivities to develop, target audiences).
        </li>
        <li style={{ marginTop: 15 }}>Priorities.</li>
      </ul>
    </Container>
  );
}

export default Policy;
