import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CreateListDialog from "../../Dialogs/createListDialog";

function FolderOptionsDialog({ anchorEl, openMenu, closeMenu }) {
  const [showListDialog, setShowListDialog] = useState(false);

  const menuItemStyle = {
    padding: "8px",
    color: "#d5d6d7",
    fontSize: "13px",
  }

  return (
    <>
      <Menu
        sx={{
          "& .MuiMenu-paper": {
            background: "#384047",
            color: "#979797",
          },
          "& li": {
            fontSize: "13px",
          }
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={closeMenu}
      >
        <h5 style={{ fontWeight: "600", padding: "5px 20px", fontSize: "11px" }}>FOLDER SETTINGS</h5>
        <MenuItem style={menuItemStyle}><AddIcon />Add Folder</MenuItem>
        <MenuItem style={menuItemStyle} onClick={() => { setShowListDialog(true) }}><AddIcon />Add List</MenuItem>
        <MenuItem style={menuItemStyle}><EditIcon />Edit</MenuItem>
        <MenuItem style={menuItemStyle}><DeleteIcon />Delete</MenuItem>
      </Menu>

      <CreateListDialog open={showListDialog} closeDialog={() => { setShowListDialog(false) }} />
    </>
  )
}

export default FolderOptionsDialog;
