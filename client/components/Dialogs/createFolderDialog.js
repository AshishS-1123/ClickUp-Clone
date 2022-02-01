import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import styles from "./dialog.module.css";

function CreateFolderDialog({ open, closeDialog }) {
  const onBackdropClick = () => {
    closeDialog();
  }

  const handleCreateFolder = () => {

  }

  return (
    <>
      <Dialog
        open={open}
        onBackdropClick={onBackdropClick}
        sx={{
          "& .MuiDialog-paper": {
            width: "550px",
            height: "419px",
            position: "absolute",
            top: "10px",
            background: "#2b343b",
          }
        }}
      >
        <div className={styles.title_bar}>
          <h1 className={styles.title}>Create new folder</h1>
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
        <div className={styles.content}>
          <label htmlFor="listDialog_name" id="dialog_nameLabel">Folder name</label>
          <input type="text" id="listDialog_name" placeholder="Enter folder name" />
        </div>
        <button
          className={styles.dialog_button}
          onClick={handleCreateFolder}
        >Create folder</button>
      </Dialog>
    </>
  )
}

export default CreateFolderDialog;
