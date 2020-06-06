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
  submitted,
  readOnly,
  style,
}) {
  return (
    <Container style={style}>
      <span>
        <label>{label}</label>
        {submitted || (touched[name] && errors[name]) ? (
          <p>{errors[name]}</p>
        ) : null}
      </span>

      <select
        name={name}
        onChange={onChange}
        value={values[name]}
        disabled={readOnly}
      >
        <option default value="">
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
