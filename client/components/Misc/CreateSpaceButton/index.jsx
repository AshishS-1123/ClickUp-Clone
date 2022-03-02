import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateSpaceDialog from "../../Dialogs/CreateSpaceDialog";

function CreateSpaceButton() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateNewSpace = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={handleCreateNewSpace}
        sx={{
          width: '80%',
          height: '24px',
          margin: '0 auto',
          fontSize: '11px',
          color: '#d7d7d7',
          background: '#384047',
          '&:hover': {
            color: '#d7d7d7',
            background: '#384047',
          },
        }}
      >
        New Space
      </Button>
      <CreateSpaceDialog open={openDialog} closeDialog={closeDialog} />
    </>
  );
}

export default CreateSpaceButton;
