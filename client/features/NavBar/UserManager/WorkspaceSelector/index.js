import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

// Returns styles for the avatar.
const stringAvatar = (name, id) => {
  const colors = [
    "#7b68ee", "#ffa12f", "#ff5722", "#f42c2c",
    "#f8306d", "#4169e1", "#0ab4ff", "#5f81ff",
    "#07ao92", "#1db954", "#2ea52c", "#757380",
  ]

  const children = name.split(" ").length >= 2
    ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    : name.substr(0, 2);

  return {
    sx: {
      bgcolor: colors[id],
      width: 32,
      height: 32,
      fontSize: "12px",
      outline: `1px dashed ${colors[id]}`,
    },
    children: children,
  };
}

function WorkspaceCreateDialog({ open, onClose }) {

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create new Workspace</DialogTitle>


    </Dialog>
  )
}

function WorkspaceSelector() {
  const [open, setOpen] = useState(false);
  const workspaces = useSelector(state => state.workspaceReducer.workspaces);

  const handleCreatingNewWorkspace = () => {

  }

  const handleAddIconClick = () => {
    // When add button is clicked, we show a dialog to create the new workspace.
    // During this time, the popover menu should be hidden.
    const menu = document.getElementById("Menu");
    menu.style.visibility = "hidden";
    // Open the dialog to create new workspace.
    setOpen(true);
  }

  const handleDialogClose = () => {
    // Make the menu visible again.
    const menu = document.getElementById("Menu");
    menu.style.visibility = "visible";

    setOpen(false);
  }

  return (
    <>
      <Stack direction="column" spacing={1.5} alignItems="center" justifyContent="center">
        {
          workspaces.map((item, idx) => {
            return <Avatar {...stringAvatar(item.name, idx)} key={item.id} />
          })
        }

        <Avatar sx={{ outline: "1px dashed red", width: 32, height: 32, bgcolor: "white", color: "black" }}>
          <AddIcon onClick={() => { handleAddIconClick() }} />
        </Avatar>
      </Stack>

      <WorkspaceCreateDialog open={open} onClose={() => { handleDialogClose() }} />
    </>
  );
};

export default WorkspaceSelector;
