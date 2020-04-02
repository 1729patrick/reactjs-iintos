import React from 'react';

import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Container, NoImage } from './styles';

export default function FileInput({
  label,
  touched,
  name,
  errors,
  placeholder,
  file,
  onChange,
  submitted,
  imagePreview,
  multiple,
  readOnly,
  ...props
}) {
  if (imagePreview) {
    return (
      <NoImage {...props}>
        <CameraAltIcon />
        {file && <img src={file} alt="Avatar" />}
        {!readOnly && (
          <input type="file" accept="image/*" name={name} onChange={onChange} />
        )}
      </NoImage>
    );
  }

  return (
    <Container>
      {label && (
        <span>
          <label>{label}</label>
          {submitted || (touched[name] && errors[name]) ? (
            <p>{errors[name]}</p>
          ) : null}
        </span>
      )}

      <div>
        <p>{placeholder}</p>
        <input
          multiple={multiple}
          type="file"
          name={name}
          onChange={onChange}
        />
      </div>
    </Container>
  );
}
