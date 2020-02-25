import React, { useState, useMemo } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Result({
  id,
  title,
  description,
  handleEditProject,
  handleDeleteRow,
}) {
  return (
    <div>
      <span>
        <EditIcon onClick={handleEditProject} />
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={handleDeleteRow}
        />
        <h1>{title}</h1>
      </span>
      <p>{description}</p>
    </div>
  );
}
