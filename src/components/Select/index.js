import React from 'react';

import { Container } from './styles';

export default function Select({
  label,
  placeholder,
  name,
  onChange,
  values,
  errors,
  touched,
  options,
}) {
  return (
    <Container>
      <span>
        <label>{label}</label>
        {touched[name] && errors[name] ? <p>{errors[name]}</p> : null}
      </span>

      <select name={name} onChange={onChange} value={values[name]}>
        <option default value="null">
          {placeholder}
        </option>

        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </Container>
  );
}
