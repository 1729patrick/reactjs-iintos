import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import FileInput from '~/components/FileInput';
import api from '~/services/api';

export default function Files({ formik }) {
  const onFileUpload = async (index, { target }) => {
    const [file] = target.files;

    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post('/files', formData);

    formik.setFieldValue(`files[${index}]`, response.data);
    formik.setFieldValue(`files[${index + 1}]`, '');
  };

  const handleRemove = (field, index) => {
    const newState = formik.values[field].filter((_, i) => i !== index);
    formik.setFieldValue(field, newState);
  };

  return (
    <span>
      <label>Files</label>
      {formik.values?.files?.map((file, index) => (
        <div>
          <FileInput
            key={String(index)}
            name="file"
            placeholder={formik.values?.files[index]?.name || 'Attachment file'}
            onChange={e => onFileUpload(index, e)}
            values={{ file: formik.values?.files[index] }}
            errors={formik.errors}
            touched={formik.touched}
          />
          {formik.values?.files?.length !== index + 1 && (
            <DeleteIcon
              style={{ color: '#cb1010', cursor: 'pointer' }}
              onClick={() => handleRemove('files', index)}
            />
          )}
        </div>
      ))}
    </span>
  );
}
