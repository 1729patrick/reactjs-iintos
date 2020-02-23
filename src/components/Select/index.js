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
}) {
  return (
    <Container>
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
        <option default selected disabled value="null">
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
