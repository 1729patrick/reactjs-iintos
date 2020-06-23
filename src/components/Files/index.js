import React from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import FileInput from '~/components/FileInput';
import api from '~/services/api';

export default function Files({ formik, path, values }) {
  const name = path ? path : 'files';

  const onFileUpload = async (index, { target }) => {
    const { files } = target;

    [...files].forEach(async (file, i) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/files', formData);

      formik.setFieldValue(`${name}[${index + i}]`, response.data);
    });

    formik.setFieldValue(`${name}[${index + [...files].length}]`, '');
  };

  const handleRemove = (field, index) => {
    const newState = (values || formik.values[field]).filter(
      (_, i) => i !== index
    );

    formik.setFieldValue(field, newState);
  };

  console.log(
    '*',
    formik.values?.files.map(x => x?.id)
  );
  return (
    <div>
      <label>Files</label>
      {(values || formik.values?.files)?.map((file, index) => (
        <div
          key={String(index)}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
        >
          <FileInput
            name="file"
            placeholder={
              (values || formik.values?.files)[index]?.name || 'Attachment file'
            }
            onChange={e => onFileUpload(index, e)}
            values={{ file: (values || formik.values?.files)[index] }}
            errors={formik.errors}
            touched={formik.touched}
            multiple
            style={{ flex: 1 }}
          />
          {(values || formik.values?.files)?.length !== index + 1 && (
            <DeleteIcon
              style={{ color: '#cb1010', cursor: 'pointer' }}
              onClick={() => handleRemove(name, index)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
