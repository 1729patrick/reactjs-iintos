import React from 'react';

import { Container } from './styles';

export default function AwaitVerification() {
  return (
    <Container>
      <div>
        <p>Your account is being verified.</p>
        <p>We'll let you know by email when it's done.</p>
      </div>
    </Container>
  );
}
