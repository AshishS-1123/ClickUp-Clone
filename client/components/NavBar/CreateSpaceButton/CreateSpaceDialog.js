import React from "react";
import Dialog from "@mui/material/Dialog";
import Container from "@mui/material/Container";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import styles from "./CreateSpaceDialog.module.css";

function SpaceNamePage() {
  return (
    <>
      <div className={styles.content}>
        <label htmlFor="spaceDialog_name" id="spaceDialog_nameLabel">Space name</label>
        <input type="text" id="spaceDialog_name" placeholder="Enter space name" />
      </div>
    </>
  )
}

function CreateSpaceDialog({ open, closeDialog }) {
  return (
    <Dialog
      open={open}
      onBackdropClick={closeDialog}
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
        <h1 className={styles.title}>Create new space</h1>
        <CloseIcon sx={{
          position: "absolute",
          top: "25px",
          right: "25px",
          color: "white",
        }} />
      </div>
      <SpaceNamePage />
      <button className={styles.spaceDialog_button}>Next</button>
    </Dialog>
  )
}

export default CreateSpaceDialog;
