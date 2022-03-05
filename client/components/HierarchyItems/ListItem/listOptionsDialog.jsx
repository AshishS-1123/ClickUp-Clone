import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateTaskDialog from '../../Dialogs/CreateTaskDialog';
import themeColors from '../../../utils/contexts/themeContext';

function ListOptionsDialog({
  anchorEl, openMenu, closeMenu, itemId, itemType,
}) {
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  const menuItemStyle = {
    padding: '8px',
    color: themeColors.textBoldColor,
    fontSize: '13px',
  };

  const iconStyle = {
    marginRight: '5px',
    transform: 'scale(0.8)',
  };

  return (
    <>
      <Menu
        sx={{
          '& .MuiMenu-paper': {
            background: themeColors.background,
            color: themeColors.textColor,
          },
          '& li': {
            fontSize: '13px',
          },
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={closeMenu}
      >
        <h5 style={{
          fontWeight: 600, padding: '5px 20px', fontSize: '13px', color: themeColors.textBoldColor,
        }}
        >
          LIST SETTINGS
        </h5>
        <MenuItem style={menuItemStyle} onClick={() => { setShowTaskDialog(true); }}>
          <AddIcon style={iconStyle} />
          Add Task
        </MenuItem>
        <MenuItem style={menuItemStyle}>
          <EditIcon style={iconStyle} />
          Edit
        </MenuItem>
        <MenuItem style={menuItemStyle}>
          <DeleteIcon style={iconStyle} />
          Delete
        </MenuItem>
      </Menu>

      <CreateTaskDialog
        open={showTaskDialog}
        closeDialog={() => { setShowTaskDialog(false); closeMenu(); }}
        itemType={itemType}
        itemId={itemId}
      />
    </>
  );
}

export default ListOptionsDialog;
