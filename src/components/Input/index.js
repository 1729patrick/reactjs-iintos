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
  error,
  value,
  border,
  style,
}) {
  return (
    <Container background={background} border={border} style={style}>
      <span>
        <label>{label}</label>
        {submitted || error || (touched[name] && errors[name]) ? (
          <p>{error || errors[name]}</p>
        ) : null}
      </span>

      {textarea ? (
        <textarea
          type={type}
          placeholder={placeholder}
          name={name}
          value={value || (values && values[name])}
          onChange={onChange}
          readOnly={readOnly}
          rows="8"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value || (values && values[name])}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </Container>
  );
}
