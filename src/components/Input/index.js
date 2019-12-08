import React from 'react';

import { Container } from './styles';

export default function Input({
  label,
  type,
  placeholder,
  name,
  onChange,
  values,
  errors,
  touched,
}) {
  return (
    <Container>
      <span>
        <label>{label}</label>
        {touched[name] && errors[name] ? <p>{errors[name]}</p> : null}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={values[name]}
        onChange={onChange}
      />
    </Container>
  );
}
