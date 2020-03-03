import React, { useCallback } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Content } from './style';
import { useUserContext } from '~/context/UserContext';

export default function Result({
  id,
  title,
  description,
  image,
  handleEditProject,
  handleDeleteRow,
}) {
  const { user } = useCallback(useUserContext(), []);

  const isGroupAdmin = useCallback(() => {
    return (
      user?.role === 'Admin' ||
      user?.role === 'IINTOS-Admin' ||
      user?.role === 'Mobility-Admin'
    );
  }, [user]);
  console.log('iamge');
  console.log(image);
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
      <p>{description}</p>
      <img src={image.url} alt={image.name} />
    </Content>
  );
}
