import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CreateViewDialog from "../../../../Dialogs/CreateViewDialog";

function AddViewButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  }

  const onClick = () => {

  }

  return (
    <div>
      <Button
        onClick={onClick}
        startIcon={<AddIcon sx={{ width: '20px', height: '20px', color: '#828588' }} />}
        disableRipple
        sx={{
          color: '#828588',
          textTransform: 'capitalize',
          fontSize: '12px',
          marginLeft: '20px',
          fontWeight: '100',
        }}
      >
        view
      </Button>

      <CreateViewDialog open={dialogOpen} closeDialog={closeDialog} />
    </div>
  )
}

export default AddViewButton;
