import React from 'react';

import { Container } from './styles';

export default function Button({ title, onClick, type }) {
  return (
    <Container type={type} onClick={onClick}>
      {title}
    </Container>
  );
}
