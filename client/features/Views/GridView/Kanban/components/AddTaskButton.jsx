import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import styles from './components.module.css';

function AddTaskButton() {
  return (
    <div className={styles.addButtonContainer}>
      <AddIcon />
      <span>Add Task</span>
    </div>
  )
}

export default AddTaskButton;
