import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import Input from '../Input';

export default function Links({ formik, values, name }) {
  const handleRemove = index => {
    const newState = values.filter((_, i) => i !== index);

    if (!name) {
      return formik.setFieldValue(`links`, newState);
    }

    formik.setFieldValue(`${name}.links`, newState);
  };

  const handleAdd = () => {
    if (!name) {
      return formik.setFieldValue(`links`, [...values, '']);
    }

    formik.setFieldValue(`${name}.links`, [...values, '']);
  };

  return (
    <div>
      <label>Links</label>
      {values?.map((_, index) => (
        <div
          key={`${values.length}${index}`}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
        >
          <Input
            label=""
            type="text"
            placeholder="Type the url"
            name={name ? `${name}.links[${index}]` : `links[${index}]`}
            value={values[index]}
            onChange={formik.handleChange}
            submitted={formik.submitCount}
            style={{ marginTop: 10 }}
            style={{ flex: 1 }}
          />
          {values?.length === index + 1 && (
            <AddCircle
              style={{
                color: 'green',
                marginLeft: 5,
                cursor: 'pointer',
                marginTop: 12,
              }}
              onClick={() => handleAdd()}
            />
          )}
          {values?.length !== index + 1 && (
            <DeleteIcon
              style={{
                color: '#D50000',
                marginLeft: 5,
                cursor: 'pointer',
                marginTop: 12,
              }}
              onClick={() => handleRemove(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
