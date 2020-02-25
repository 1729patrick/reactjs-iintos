import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Content } from './style';

export default function Result({
  id,
  title,
  description,
  handleEditProject,
  handleDeleteRow,
}) {
  return (
    <Content>
      <span>
        <h1>{title}</h1>
        <EditIcon onClick={handleEditProject} />
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={handleDeleteRow}
        />
      </span>
      <p>{description}</p>
    </Content>
  );
}
