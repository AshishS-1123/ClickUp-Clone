import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from '@mui/icons-material/Close';
import SpaceNamePage from "./pages/spaceNamePage";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateItemDialog.module.css";
import { createSpaceAsync } from "../../../redux/slices/spaceSlice";


function CreateItemDialog({ open, closeDialog }) {
  const dispatch = useDispatch();
  const workspaceData = useSelector(state => state.workspaceReducer);
  const userData = useSelector(state => state.authReducer);

  const backdropClicked = () => {
    closeDialog();
  }

  const handleCreateSpace = () => {
    const nameInput = document.getElementById("spaceDialog_name");
    const spaceName = nameInput.value;

    const workspaceId = workspaceData.workspaces[workspaceData.activeWorkspace].id;
    const userId = userData.userId;
    const token = userData.token;
    console.log(spaceName);

    dispatch(createSpaceAsync({ spaceName, workspaceId, userId, token }))
      .then((res) => {
        if (!res.payload.error)
          backdropClicked();
      })
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
        <CloseIcon
          sx={{
            position: "absolute",
            top: "25px",
            right: "25px",
            color: "white",
          }}
          onClick={backdropClicked}
        />
      </div>
      {
        <SpaceNamePage />
      }
      <button
        className={styles.spaceDialog_button}
        onClick={handleCreateSpace}
      >Create space</button>
    </Dialog>
  )
}

export default CreateItemDialog;
