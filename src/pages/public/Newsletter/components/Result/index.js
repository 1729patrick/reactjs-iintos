import React, { useCallback, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import api from '../../../../../services/api';
import { Content, Credits } from './style';
import { useUserContext } from '~/context/UserContext';
import FileInput from '../../../../../components/FileInput';

export default function Result({
  id,
  title,
  description,
  image,
  author,
  creationDate,
  handleEditProject,
  handleDeleteRow,
}) {
  const { user } = useCallback(useUserContext(), []);
  const [file, setFile] = useState(image?.url);

  // The admim or the author can alter the new
  const isGroupAdmin = useCallback(() => {
    return user?.role === 'Admin' || user?.id === author?.id;
  }, [user, author]);

  const onFileUpload = async ({ target }) => {
    const [file] = target.files;

    const formData = new FormData();

    formData.append('file', file);

    setFile(URL.createObjectURL(file));

    const response = await api.post('/files', formData);
    const imageId = response.data.id;
    await api.put(`/news/${id}`, { title, description, imageId });
  };

  return (
    <Content>
      <span>
        <h1>{title}</h1>

        <div>
          {isGroupAdmin() && (
            <>
              <EditIcon onClick={handleEditProject} />
              <DeleteIcon
                style={{ color: '#cb1010', cursor: 'pointer' }}
                onClick={handleDeleteRow}
              />
            </>
          )}
        </div>
      </span>
      {isGroupAdmin() && (
        <FileInput
          imagePreview
          style={{
            height: 250,
            width: '100%',
            borderRadius: 4,
          }}
          file={file}
          onChange={onFileUpload}
          readOnly={!isGroupAdmin()}
        />
      )}
      <p>{description}</p>
      <Credits>
        {' '}
        Created by: {author?.name}
        <br />
        {creationDate}
      </Credits>
    </Content>
  );
}
