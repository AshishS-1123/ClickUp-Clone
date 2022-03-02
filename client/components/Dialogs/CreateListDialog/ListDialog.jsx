import React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../dialog.module.css';

function CreateListDialog({ open, closeDialog, handleCreateList }, ref) {
  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
      sx={{
        '& .MuiDialog-paper': {
          width: '550px',
          height: '419px',
          position: 'absolute',
          top: '10px',
          background: '#2b343b',
        },
      }}
    >
      <div className={styles.title_bar}>
        <h1 className={styles.title}>Create new list</h1>
        <CloseIcon
          sx={{
            position: 'absolute',
            top: '25px',
            right: '25px',
            color: 'white',
          }}
          onClick={closeDialog}
        />
      </div>
      <div className={styles.content}>
        <label htmlFor="listDialog_name" id="dialog_nameLabel">List name</label>
        <input type="text" id="listDialog_name" placeholder="Enter list name" ref={ref} />
      </div>
      <button
        className={styles.dialog_button}
        onClick={handleCreateList}
      >
        Create list
      </button>
    </Dialog>
  );
}

export default React.forwardRef(CreateListDialog);
