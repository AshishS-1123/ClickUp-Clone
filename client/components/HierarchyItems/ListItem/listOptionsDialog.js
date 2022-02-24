import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CreateTaskDialog from "../../Dialogs/createTaskDialog";

function ListOptionsDialog({ anchorEl, openMenu, closeMenu, itemId, itemType }) {
  const [showTaskDialog, setShowTaskDialog] = useState(false);

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
        <h5 style={{ fontWeight: "600", padding: "5px 20px", fontSize: "11px" }}>LIST SETTINGS</h5>
        <MenuItem style={menuItemStyle} onClick={() => { setShowTaskDialog(true) }}><AddIcon />Add Task</MenuItem>
        <MenuItem style={menuItemStyle}><EditIcon />Edit</MenuItem>
        <MenuItem style={menuItemStyle}><DeleteIcon />Delete</MenuItem>
      </Menu>

      <CreateTaskDialog
        open={showTaskDialog}
        closeDialog={() => { setShowTaskDialog(false); closeMenu() }}
        itemType={itemType}
        itemId={itemId}
      />
    </>
  )
}

export default ListOptionsDialog;
