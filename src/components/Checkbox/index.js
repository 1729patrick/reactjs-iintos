import React from 'react';

import { Container } from './styles';

export default function Checkbox({ name, onChange, values, errors, touched }) {
  return (
    <Container>
      <input
        type="checkbox"
        name={name}
        value="true"
        checked={values[name]}
        onChange={onChange}
      />

      <span>
        <label>I'm coordinator</label>
        {touched[name] && errors[name] ? <p>{errors[name]}</p> : null}
      </span>
    </Container>
  );
}
