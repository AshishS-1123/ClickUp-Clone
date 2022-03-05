import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateListDialog from '../../Dialogs/CreateListDialog';
import CreateFolderDialog from '../../Dialogs/CreateFolderDialog';
import CreateTaskDialog from '../../Dialogs/CreateTaskDialog';
import themeColors from '../../../utils/contexts/themeContext';

function FolderOptionsDialog({
  anchorEl, openMenu, closeMenu, itemId, itemType,
}) {
  const [showListDialog, setShowListDialog] = useState(false);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);

  const menuItemStyle = {
    padding: '8px',
    color: themeColors.textColor,
    fontSize: '13px',
  };

  const iconStyle = {
    marginRight: '5px',
    transform: 'scale(0.8)',
    color: 'grey',
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
          fontWeight: 300, padding: '5px 20px', fontSize: '11px', color: themeColors.textBoldColor,
        }}
        >
          FOLDER SETTINGS
        </h5>
        <MenuItem style={menuItemStyle} onClick={() => { setShowFolderDialog(true); }}>
          <AddIcon style={iconStyle} />
          Add Folder
        </MenuItem>
        <MenuItem style={menuItemStyle} onClick={() => { setShowListDialog(true); }}>
          <AddIcon style={iconStyle} />
          Add List
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

      <CreateFolderDialog
        open={showFolderDialog}
        closeDialog={() => { setShowFolderDialog(false); closeMenu(); }}
        itemType={itemType}
        itemId={itemId}
      />
      <CreateListDialog
        open={showListDialog}
        closeDialog={() => { setShowListDialog(false); closeMenu(); }}
        itemType={itemType}
        itemId={itemId}
      />
    </>
  );
}

export default FolderOptionsDialog;
