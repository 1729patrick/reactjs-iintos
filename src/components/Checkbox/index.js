import React from 'react';

import { Container } from './styles';

export default function Checkbox({
  name,
  onChange,
  values,
  errors,
  touched,
  label,
  readOnly,
}) {
  return (
    <Container>
      <input
        type="checkbox"
        name={name}
        value="true"
        checked={values[name]}
        onChange={onChange}
        disabled={readOnly}
      />

      <span>
        <label style={{ marginBottom: 0 }}>{label}</label>
        {touched[name] && errors[name] ? <p>{errors[name]}</p> : null}
      </span>
    </Container>
  );
}
