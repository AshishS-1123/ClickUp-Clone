import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import themeColors from '../../../../utils/contexts/themeContext';

function PriorityButton({ onPrioritySelect }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const openDialog = Boolean(anchorElement);
  const priorities = useSelector(state => state.metaReducer.priorities);
  const [selectedPriority, setSelectedPriority] = useState({ _id: '', level: '', color: '' });

  const iconStyles = {
    color: selectedPriority.color || themeColors.textBoldColor,
    width: '34px',
    height: '34px',
    border: `1px dashed ${selectedPriority.color || themeColors.textColor}`,
    borderRadius: '50%',
    padding: '5px',
    margin: '0 5px',
    marginRight: '2px',
    cursor: 'pointer',
  }

  const priorityItemStyle = {
    margin: '5px 0',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  const onPriorityButtonClick = (priority) => {
    setSelectedPriority(priority);
    setAnchorElement(null);
    onPrioritySelect(priority);
  }

  useEffect(() => {
    setSelectedPriority(priorities[0]);
    onPrioritySelect(priorities[0]);
  }, []);

  return (
    <>
      <AssistantPhotoIcon
        sx={iconStyles}
        onClick={(event) => { setAnchorElement(event.currentTarget) }}
      />

      <Menu
        anchorEl={anchorElement}
        open={openDialog}
        onBackdropClick={() => { setAnchorElement(null) }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& ul': {
            padding: '14px',
          }
        }}
      >
        {
          priorities.map(item => {
            return (
              <div
                key={item._id}
                style={priorityItemStyle}
                onClick={() => onPriorityButtonClick(item)}
              >
                <AssistantPhotoIcon sx={{ color: item.color }} />
                <span>{item.level}</span>
              </div>
            )
          })
        }
      </Menu>
    </>
  )
}

export default PriorityButton;
