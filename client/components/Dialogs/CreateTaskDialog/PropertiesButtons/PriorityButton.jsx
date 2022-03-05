import React from 'react';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import themeColors from '../../../../utils/contexts/themeContext';

function PriorityButton() {

  const iconStyles = {
    color: themeColors.textBoldColor,
    width: '34px',
    height: '34px',
    border: `1px dashed ${themeColors.textColor}`,
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
