import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import themeColors from '../../../../utils/contexts/themeContext';

function StatusButton({ onStatusSelect }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const openDialog = Boolean(anchorElement);
  const statuses = useSelector(state => state.metaReducer.statuses);
  const [selectedStatus, setSelectedStatus] = useState({ _id: '', status: '', color: '' });

  const iconStyles = {
    color: selectedStatus.color || themeColors.textBoldColor,
    width: '34px',
    height: '34px',
    border: `1px dashed ${selectedStatus.color || themeColors.textColor}`,
    borderRadius: '50%',
    padding: '5px',
    margin: '0 5px',
    marginRight: '2px',
    cursor: 'pointer',
  }

  const statusItemStyle = {
    margin: '5px 0',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  const onStatusButtonClick = (status) => {
    setSelectedStatus(status);
    setAnchorElement(null);
    onStatusSelect(status);
  }

  useEffect(() => {
    setSelectedStatus(statuses[0]);
    onStatusSelect(statuses[0]);
  }, []);

  return (
    <>
      <MonitorHeartOutlinedIcon
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
          statuses.map(item => {
            return (
              <div
                key={item._id}
                style={statusItemStyle}
                onClick={() => onStatusButtonClick(item)}
              >
                <MonitorHeartOutlinedIcon sx={{ color: item.color, marginRight: '10px' }} />
                <span>{item.status}</span>
              </div>
            )
          })
        }
      </Menu>
    </>
  )
}

export default StatusButton;
