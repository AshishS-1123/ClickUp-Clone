import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createNewWorkspaceAsync, switchWorkspace } from '../../../../redux/slices/workspaceSlice';
import themeColors from '../../../../utils/contexts/themeContext';

// Returns styles for the avatar.
const stringAvatar = (name, id) => {
  // const colors = [
  //   "#7b68ee", "#ffa12f", "#ff5722", "#f42c2c",
  //   "#f8306d", "#4169e1", "#0ab4ff", "#5f81ff",
  //   "#07ao92", "#1db954", "#2ea52c", "#757380",
  // ]

  const children = name.split(' ').length >= 2
    ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    : name.substr(0, 2);

  return {
    sx: {
      bgcolor: themeColors.accentColor,
      width: 32,
      height: 32,
      fontSize: '10px',
      color: 'black',
    },
    children,
  };
};

function WorkspaceCreateDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.userId);
  const token = useSelector((state) => state.authReducer.token);
  const error = useSelector((state) => state.workspaceReducer.error);

  const handleCreatingNewWorkspace = () => {
    const inputRef = document.getElementById('WorkspaceFormInput');
    const workspaceName = inputRef?.value;

    dispatch(createNewWorkspaceAsync({ userId, token, workspaceName }))
      .then(() => {
        // After the new workspace has been created successfully,
        // close the dialog. Otherwise, keep it open so that the user can see the error.
        console.log('Action success');
        onClose();
      });
  };

  return (
    <Dialog onClose={onClose} open={open}>

      <Box sx={{
        padding: '0px 20px 30px 20px',
        textAlign: 'center',
        '& > .MuiTextField-root': {
          width: '100%',
        },
        '& label': {
          textTransform: 'capitalize',
        },
        '& > button': {
          marginTop: '20px',
        },
      }}
      >
        <DialogTitle>Create new Workspace</DialogTitle>
        <TextField id="WorkspaceFormInput" label="workspace name" variant="standard">Workspace Name</TextField>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: '#ffa12f',
            color: '#20262b',
            '&:focus, &:hover': {
              background: '#ffa12f',
            },
          }}
          onClick={handleCreatingNewWorkspace}
        >
          Create
        </Button>
        <p style={{ color: 'red', fontSize: '12px', marginTop: '12px' }}>{error}</p>
      </Box>
    </Dialog>
  );
}

function WorkspaceSelector() {
  const [open, setOpen] = useState(false);
  const workspaces = useSelector((state) => state.workspaceReducer.workspaces);
  const dispatch = useDispatch();

  const handleAddIconClick = () => {
    // When add button is clicked, we show a dialog to create the new workspace.
    // During this time, the popover menu should be hidden.
    const menu = document.getElementById('Menu');
    menu.style.visibility = 'hidden';
    // Open the dialog to create new workspace.
    setOpen(true);
  };

  const handleDialogClose = () => {
    // Make the menu visible again.
    const menu = document.getElementById('Menu');
    menu.style.visibility = 'visible';

    setOpen(false);
  };

  const handleWorkspaceIconClick = (activeIndex) => {
    dispatch(switchWorkspace({ workspaceId: activeIndex }))
      .then(() => {
        console.log('Set active to', activeIndex);
      });
  };

  return (
    <>
      <Stack direction="column" spacing={1.5} alignItems="center" justifyContent="center" sx={{ paddingTop: '5px' }}>
        {
          workspaces.map((item, idx) => (
            <Avatar
              {...stringAvatar(item.name, idx)}
              key={item.id}
              onClick={() => { handleWorkspaceIconClick(idx); }}
            />
          ))
        }

        <Avatar sx={{
          width: 32, height: 32, bgcolor: themeColors.backgroundDark, color: themeColors.textBoldColor,
        }}
        >
          <AddIcon onClick={() => { handleAddIconClick(); }} />
        </Avatar>
      </Stack>

      <WorkspaceCreateDialog open={open} onClose={() => { handleDialogClose(); }} />
    </>
  );
}

export default WorkspaceSelector;
