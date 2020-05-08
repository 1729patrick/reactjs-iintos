import React from 'react';

import { Container } from './styles';

export default function Input({
  label,
  type,
  placeholder,
  name,
  onChange,
  values,
  readOnly,
  errors = {},
  touched = {},
  textarea,
  submitted,
  background,
  border,
}) {
  return (
    <Container background={background} border={border}>
      <span>
        <label>{label}</label>
        {submitted || (touched[name] && errors[name]) ? (
          <p>{errors[name]}</p>
        ) : null}
      </span>

      {textarea ? (
        <textarea
          type={type}
          placeholder={placeholder}
          name={name}
          value={values && values[name]}
          onChange={onChange}
          readOnly={readOnly}
          rows="8"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={values && values[name]}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </Container>
  );
}
