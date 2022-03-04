import React from 'react';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';

function PriorityButton() {

  const iconStyles = {
    color: '#8a8d91',
    width: '34px',
    height: '34px',
    border: '1px dashed #d5d6d7',
    borderRadius: '50%',
    padding: '5px',
    margin: '0 5px',
  }

  return (
    <>
      <AssistantPhotoIcon sx={iconStyles} />
    </>
  )
}

export default PriorityButton;
