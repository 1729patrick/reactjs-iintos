import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';
import Input from '../Input';

export default function Links({ formik, values, name }) {
  const handleRemove = index => {
    const newState = values.filter((_, i) => i !== index);

    formik.setFieldValue(`${name}.links`, newState);
  };

  const handleAdd = () => {
    formik.setFieldValue(`${name}.links`, [...values, '']);
  };

  return (
    <div>
      <label>Links</label>
      {values?.map((_, index) => (
        <div
          key={String(index)}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
        >
          <Input
            label=""
            type="text"
            placeholder="Type the url"
            name={`${name}.links[${index}]`}
            value={values[index]}
            onChange={formik.handleChange}
            submitted={formik.submitCount}
            style={{ marginTop: 10 }}
            style={{ flex: 1 }}
          />
          {values?.length === index + 1 && (
            <AddCircle
              style={{ color: 'green', marginLeft: 5, cursor: 'pointer' }}
              onClick={() => handleAdd()}
            />
          )}
          {values?.length !== index + 1 && (
            <DeleteIcon
              style={{ color: '#cb1010', marginLeft: 5, cursor: 'pointer' }}
              onClick={() => handleRemove(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
