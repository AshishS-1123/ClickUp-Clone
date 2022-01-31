import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import SpaceNamePage from "./pages/spaceNamePage";
import ViewSelectorPage from "./pages/viewSelectorPage";
import SpaceStatusPage from "./pages/spaceStatusesPage";
import ConfirmationPage from "./pages/confirmationPage";
import styles from "./CreateSpaceDialog.module.css";


function CreateSpaceDialog({ open, closeDialog }) {
  // const Pages = [
  //   { page: SpaceNamePage, title: "Create new space" },
  //   { page: ViewSelectorPage, title: "Default settings for views" },
  //   { page: SpaceStatusPage, title: "What task statuses do you want?" },
  //   { page: ConfirmationPage, title: "All good?" },
  // ]

  // const [currPageIdx, setCurrPageIdx] = useState(0);
  // const CurrentPage = Pages[currPageIdx].page;
  // const currentTitle = Pages[currPageIdx].title;

  // const gotoNextPage = () => {
  //   setCurrPageIdx(prev => prev + 1);
  // }

  const backdropClicked = () => {
    setCurrPageIdx(0);
    closeDialog();
  }

  return (
    <Dialog
      open={open}
      onBackdropClick={backdropClicked}
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
      {
        <SpaceNamePage />
      }
      <button
        className={styles.spaceDialog_button}
      >Next</button>
    </Dialog>
  )
}

export default CreateSpaceDialog;
