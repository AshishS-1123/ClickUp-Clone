import React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
// Priority Icon
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
// Due Dates Icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// Tags Icon
import StyleIcon from '@mui/icons-material/Style';
import styles from './TaskDialog.module.css';

const iconStyles = {
  color: '#8a8d91',
  width: '34px',
  height: '34px',
  border: '1px dashed #d5d6d7',
  borderRadius: '50%',
  padding: '5px',
  margin: '0 5px',
}

function CreateTaskDialog({ open, closeDialog, handleCreateTask, inList = 'List 1', forWorkspace = 'Workspace 1' }, ref) {
  return (
    <Dialog
      open={true}
      onBackdropClick={closeDialog}
      sx={{
        '& .MuiDialog-paper': {
          width: '580px',
          height: '510px',
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          background: '#384047',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        },
      }}
    >
      <div className={styles.topBar}>
        <input placeholder='Task name' />
        <CloseIcon />
      </div>

      <div className={styles.parentInfoBar}>
        <label>In</label>
        <div className={styles.forList}>{inList}</div>

        <label>For</label>
        <div className={styles.forWorkspace}>{forWorkspace}</div>
      </div>

      <textarea className={styles.descriptionInput} />

      <div className={styles.bottomBar}>
        <div className={styles.propertiesBar}>
          <AssistantPhotoIcon sx={iconStyles} />
          <CalendarTodayIcon sx={iconStyles} />
          <StyleIcon sx={iconStyles} />
        </div>
        <button className={styles.button} onClick={handleCreateTask}>Create Task</button>
      </div>

    </Dialog>
  );
}

export default React.forwardRef(CreateTaskDialog);
