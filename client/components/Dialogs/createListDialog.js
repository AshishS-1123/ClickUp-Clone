import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./dialog.module.css";

function CreateListDialog({ open, closeDialog }) {
  const onBackdropClick = () => {
    closeDialog();
  }

  return (
    <>
      <Dialog
        open={open}
        onBackdropClick={onBackdropClick}
      >
        <div className={styles.titleBar}>
          <h1 className={styles.title}>Create new list</h1>
          <CloseIcon
            sx={{
              position: "absolute",
              top: "25px",
              right: "25px",
              color: "white",
            }}
            onClick={closeDialog}
          />
        </div>
      </Dialog>
    </>
  )
}

export default CreateListDialog;
