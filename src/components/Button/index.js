import React from 'react';

import { Container } from './styles';

export default function Button({
  title,
  onClick,
  type,
  color = '#0c1e3f',
  width,
  marginTop,
}) {
  return (
    <Container
      type={type}
      onClick={onClick}
      color={color}
      width={width}
      marginTop={marginTop}
    >
      {title}
    </Container>
  );
}
